import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/news')
@ApiTags('News')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get the last 20 news items' })
  @ApiResponse({ status: 200, description: 'Returns the last 20 news items.' })
  getNews() {
    return this.newsService.getNews();
  }
}
