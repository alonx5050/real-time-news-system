import pika
import json
import random
import time
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

# RabbitMQ config
RABBITMQ_HOST = os.getenv("RABBITMQ_HOST")
RABBITMQ_PORT = int(os.getenv("RABBITMQ_PORT"))
RABBITMQ_EXCHANGE = os.getenv("RABBITMQ_EXCHANGE")

# News categories
CATEGORIES = ["Technology", "Business", "World", "Science"]



# Publish news to RabbitMQ
def publish_news():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT))
    channel = connection.channel()

    # Declare exchange
    channel.exchange_declare(exchange=RABBITMQ_EXCHANGE, exchange_type="fanout")

    try:
        while True:
            news_item = generate_news()
            channel.basic_publish(
                exchange=RABBITMQ_EXCHANGE,
                routing_key="",
                body=json.dumps(news_item),
                properties=pika.BasicProperties(content_type="application/json"),
            )
            print(f"Published: {news_item}")
            time.sleep(random.randint(5, 10))  # Wait 5-10 seconds
    except KeyboardInterrupt:
        print("Stopping news generator...")
    finally:
        connection.close()

if __name__ == "__main__":
    publish_news()
