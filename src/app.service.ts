import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';
import { ContentDto } from './submodules/backend-social-1.0-dtos/src/dtos/content.dto';
import { ReactionDto } from './submodules/backend-social-1.0-dtos/src/dtos/reaction.dto';
import { RMQPayloadDto } from './submodules/backend-social-1.0-rmq/src/dtos/rmqPayload.dto';
import { PlatformEvents } from './submodules/backend-social-1.0-rmq/src/enums/platformEvents';
import { RmqTopics } from './submodules/backend-social-1.0-rmq/src/enums/rmqTopics';
import { MsgBrokerService } from './submodules/backend-social-1.0-rmq/src/module/msg-broker-ops/msg-broker-ops.service';

@Injectable()
export class AppService {
  constructor(
    @Inject('CONTENT_SERVICE_QUEUE') private contentQueueClient: ClientProxy,
    private readonly msgBrokerService: MsgBrokerService,
  ) {}

  async createContent(content: ContentDto) {
    const rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.CONTENT_CREATION,
      payload: content,
    };

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.CONTENT_CREATION_TOPIC,
      this.contentQueueClient,
    );
    return 'Content Created successfully';
  }

  async updateContent(content: ContentDto) {
    const rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.CONTENT_UPDATE,
      payload: content,
    };

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.CONTENT_UPDATE_TOPIC,
      this.contentQueueClient,
    );
    return 'update successful';
  }

  async createReaction(reaction: ReactionDto) {
    const rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.REACTION_CREATION,
      payload: reaction,
    };

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.REACTION_CREATION_TOPIC,
      this.contentQueueClient,
    );
    return 'reacted';
  }

  async updateReaction(reaction: ReactionDto){
    const rmqPayload: RMQPayloadDto = {
      event: PlatformEvents.REACTION_UPDATE,
      payload: reaction,
    };

    this.msgBrokerService.emitToQueue(
      rmqPayload,
      RmqTopics.REACTION_UPDATE_TOPIC,
      this.contentQueueClient,
    );
    return 'reaction updated';
  }

  // async deleteReaction(reactedId: number) {
  //   const rmqPayload: RMQPayloadDto = {
  //     event: PlatformEvents.REACTION_DELETE,
  //     payload: reactionId,
  //   };

  //   this.msgBrokerService.emitToQueue(
  //     rmqPayload,
  //     RmqTopics.REACTION_DELETE_TOPIC,
  //     this.contentQueueClient,
  //   );
  //   return 'reacted';
  // }
}
