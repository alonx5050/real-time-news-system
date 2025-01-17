import pika
import json
import random
import time
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# RabbitMQ configuration
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT"))
RABBITMQ_EXCHANGE = os.getenv("RABBITMQ_EXCHANGE", "news_exchange")

# News categories
CATEGORIES = ["Technology", "Business", "World", "Science"]

# Function to generate a random news item
def generate_news():
    category = random.choice(CATEGORIES).lower()
    title = f"Breaking News in {category.capitalize()}"
    content = f"This is a detailed report about {random.choice(['advancements', 'issues', 'developments'])} in {category}."
    timestamp = datetime.utcnow().isoformat()
    keywords = random.sample(["GCP", "Computer_Vision", "Laliga", "Bigquery", "Java"], 3)
    return {
        "title": title,
        "content": content,
        "category": category,
        "timestamp": timestamp,
        "keywords": keywords,
    }

# Publish news to RabbitMQ
def publish_news():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT))
    channel = connection.channel()

    # Declare a topic exchange
    channel.exchange_declare(exchange=RABBITMQ_EXCHANGE, exchange_type="topic")

    try:
        while True:
            news_item = generate_news()
            routing_key = f"news.{news_item['category']}"
            channel.basic_publish(
                exchange=RABBITMQ_EXCHANGE,
                routing_key=routing_key,
                body=json.dumps(news_item),
                properties=pika.BasicProperties(content_type="application/json"),
            )
            print(f"Published to {routing_key}: {news_item}")
            time.sleep(random.randint(5, 10))  # Wait 5-10 seconds
    except KeyboardInterrupt:
        print("Stopping news generator...")
    finally:
        connection.close()

if __name__ == "__main__":
    publish_news()
