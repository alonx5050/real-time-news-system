import { Injectable } from '@nestjs/common';

export interface NewsItem {
  title: string;
  content: string;
  category: string;
  timestamp: string;
  keywords: string[];
}

@Injectable()
export class NewsService {
  private news: NewsItem[] = [];

  // Add a new news item and keep the last 20 items
  addNewsItem(item: NewsItem) {
    this.news.unshift(item); // Add to the front
    if (this.news.length > 20) {
      this.news.pop(); // Remove the oldest
    }
  }

  // Get all stored news items
  getNews(): NewsItem[] {
    return this.news;
  }
}
