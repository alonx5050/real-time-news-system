import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsService } from './news/news.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NewsService],
})
export class AppModule {}
