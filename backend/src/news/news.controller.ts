import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NewsService } from './news.service';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @EventPattern('news.#') // Listen for all news messages
  handleNewsMessage(news: any) {
    console.log('Received news:', news);
    this.newsService.addNewsItem(news);
  }
}
