import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create the microservice for RabbitMQ
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ connection
      queue: 'news_queue', // Queue name
      noAck: false, // Enable manual acknowledgment
      queueOptions: {
        durable: true, // Ensure the queue is persistent
      },
    },
  });

  // Start the microservice
  await microservice.listen();

  // Start the HTTP application
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
bootstrap();
