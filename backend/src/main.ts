import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up RabbitMQ microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ URL
      queue: 'news_queue', // Queue name
      queueOptions: {
        durable: true,
      },
    },
  });

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('Real-Time News API')
    .setDescription('API for real-time news system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start microservices and main app
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
}
bootstrap();
