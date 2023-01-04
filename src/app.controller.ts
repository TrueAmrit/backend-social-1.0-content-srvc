import { Body, Controller, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ContentDto } from './submodules/backend-social-1.0-dtos/src/dtos/content.dto';

@Controller('content')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createContent(@Body() content: ContentDto) {
    try {
      const createdContent = await this.appService.createContent(content);
      return createdContent;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put()
  async updateUser(@Body() content: ContentDto) {
    try {
      const updatedContent = await this.appService.updateContent(content);
      return updatedContent;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
