import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { NewsService } from './news.service';

@Controller()
export class NewsListener {
    constructor(private readonly newsService: NewsService) { }

    @EventPattern('news.#') // Listen to all routing keys starting with 'news.'
    handleNewsMessage(news: any) {
        console.log('Received news:', news);
        this.newsService.addNewsItem(news);
    }
}
