import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { NewsService } from './news.service';

@Controller()
export class NewsListener {
  private readonly logger = new Logger(NewsListener.name);

  constructor(private readonly newsService: NewsService) {}

  @EventPattern('news.#') // Match routing keys like 'news.business', 'news.technology'
  async handleNewsMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      // Validate the incoming data
      if (!this.validateNews(data)) {
        throw new Error('Invalid news data');
      }

      // Log and process the news item
      this.logger.log(`Received valid news: ${JSON.stringify(data)}`);
      this.newsService.addNewsItem(data);

      // Acknowledge the message
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error(`Error processing message: ${error.message}`);
      // Reject the message (do not requeue)
      channel.nack(originalMsg, false, false);
    }
  }

  private validateNews(data: any): boolean {
    return (
      typeof data.title === 'string' &&
      typeof data.content === 'string' &&
      typeof data.category === 'string' &&
      typeof data.timestamp === 'string' &&
      Array.isArray(data.keywords)
    );
  }
}
