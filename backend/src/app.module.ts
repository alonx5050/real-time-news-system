import { Module } from '@nestjs/common';
import { NewsService } from './news/news.service';
import { NewsListener } from './news/news.listener';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NewsController } from './news/news.controller'; // Add the NewsController import

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // RabbitMQ URL
          queue: 'news_queue', // Name of the queue
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsListener],
})
export class AppModule { }
