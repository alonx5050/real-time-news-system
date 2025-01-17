import { Injectable } from '@nestjs/common';

interface NewsItem {
    title: string;
    content: string;
    category: string;
    timestamp: string;
    keywords: string[];
}

@Injectable()
export class NewsService {
    private news: NewsItem[] = [];

    // Add a news item and keep the last 20
    addNewsItem(item: NewsItem) {
        this.news.unshift(item); // Add new item to the front
        if (this.news.length > 20) {
            this.news.pop(); // Remove the oldest item
        }
    }

    // Get all news
    getNews(): NewsItem[] {
        return this.news;
    }
}
