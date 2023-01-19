import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { DeleteDateColumn } from 'typeorm';
import { AppService } from './app.service';
import { ContentDto } from './submodules/backend-social-1.0-dtos/src/dtos/content.dto';
import { ReactionDto } from './submodules/backend-social-1.0-dtos/src/dtos/reaction.dto';

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

  @Post('reaction')
  async createReaction(@Body() reaction: ReactionDto) {
    try {
      const createdReaction = await this.appService.createReaction(reaction);
      return createdReaction;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Put('reaction/update')
  async updateReaction(@Body() reaction: ReactionDto) {
    try {
      const updatedReaction = await this.appService.updateReaction(reaction);
      return updatedReaction;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
