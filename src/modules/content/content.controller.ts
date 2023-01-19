import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { query } from 'express';
import { RMQPayloadDto } from 'src/submodules/backend-social-1.0-rmq/src/dtos/rmqPayload.dto';
import { RmqTopics } from 'src/submodules/backend-social-1.0-rmq/src/enums/rmqTopics';
import { ContentService } from './content.service';

@Controller('content')
export default class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @EventPattern(RmqTopics.CONTENT_CREATION_TOPIC) //creating new content
  async createContent(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('CONTENT DTO here', rmqPayload);
      await this.contentService.createContent(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }
  @EventPattern(RmqTopics.CONTENT_UPDATE_TOPIC) //updating the existing content
  async updateContent(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('CONTENT DTO here', rmqPayload);
      await this.contentService.updateContent(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }

  @EventPattern(RmqTopics.REACTION_CREATION_TOPIC) //creating new content
  async createReaction(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('CONTENT DTO here', rmqPayload);
      await this.contentService.createReaction(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }
  @EventPattern(RmqTopics.REACTION_UPDATE_TOPIC) //creating new content
  async updateReaction(data: any) {
    try {
      const rmqPayload: RMQPayloadDto = data.payload;
      console.log('CONTENT DTO here', rmqPayload);
      await this.contentService.updateReaction(rmqPayload.payload);
    } catch (err) {
      console.log(err);
    }
  }
  @Get() //fetching all content
  async findContent() {
    try {
      const fetchedContent = await this.contentService.findAll();
      return fetchedContent;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':id') //deleting a content
  async deleteUser(@Param('id') contentId: number) {
    try {
      const deletedContent = await this.contentService.deleteContent(contentId);
      return deletedContent;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('/user-profile') //localhost:5000/content/user-profile?userId=2 (for fetching all content of a user)
  async getContentByUser(@Query() query: { userId: number }) {
    try {
      const { userId } = query;
      const fetchedContent = await this.contentService.getContentByUser(userId);

      return fetchedContent;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/group') // localhost:5000/content/group?groupId=2 (for fetching all contents of a given groupID)
  async getContentByGroup(@Query() query: { groupId: number }) {
    try {
      const { groupId } = query;
      const fetchedContent = await this.contentService.getContentByGroup(
        groupId,
      );
      return fetchedContent;
    } catch (error) {
      console.log(error);
    }
  }
  @Delete('reaction/delete/:id') //localhost:5000/content/delete/6 (deleting a reaction/comment)
  async deleteReaction(@Param('id') reactionId: number) {
    try {
      const deletedReaction = await this.contentService.deleteReaction(
        reactionId,
      );
      return deletedReaction;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  @Get('/reaction') //localhost:5000/content/reaction?contentId=2 (for fetching all reaction of a content)
  async getReactionByContent(@Query() query: { contentId: number }) {
    try {
      const { contentId } = query;
      const fetchedContent = await this.contentService.getReactionByContent(
        contentId,
      );

      return fetchedContent;
    } catch (error) {
      console.log(error);
    }
  }
}
