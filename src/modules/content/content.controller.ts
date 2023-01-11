import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { query } from 'express';
import { RMQPayloadDto } from 'src/submodules/backend-social-1.0-rmq/src/dtos/rmqPayload.dto';
import { RmqTopics } from 'src/submodules/backend-social-1.0-rmq/src/enums/rmqTopics';
import { ContentService } from './content.service';

@Controller('content')
export default class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @EventPattern(RmqTopics.CONTENT_CREATION_TOPIC)
  async createContent(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('CONTENT DTO here', rmqPayload);
      await this.contentService.createContent(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }
  @EventPattern(RmqTopics.CONTENT_UPDATE_TOPIC)
  async updateContent(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('CONTENT DTO here', rmqPayload);
      await this.contentService.createContent(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }

  @Get()
  async findContent() {
    try {
      const fetchedContent = await this.contentService.findAll();
      return fetchedContent;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') contentId: number) {
    try {
      const deletedContent = await this.contentService.deleteContent(contentId);
      return deletedContent;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('/user-profile')
  async getContentByUser(@Query() query: { userId: number }) {
    try {
      const { userId } = query;
      const fetchedContent = await this.contentService.getContentByUser(userId);

      return fetchedContent;
    } catch (error) {
      console.log(error);
    }
  }
}
