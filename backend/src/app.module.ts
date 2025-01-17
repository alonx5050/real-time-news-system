import { Module } from '@nestjs/common';
import { NewsService } from './news/news.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NewsListener } from './news/news.listener';  // Import the NewsListener

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'news_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [NewsService, NewsListener],  // Add the NewsListener to the providers
})
export class AppModule { }
