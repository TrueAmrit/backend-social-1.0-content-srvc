import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentDto } from 'src/submodules/backend-social-1.0-dtos/src/dtos/content.dto';
import { GroupDto } from 'src/submodules/backend-social-1.0-dtos/src/dtos/group.dto';
import { ReactionDto } from 'src/submodules/backend-social-1.0-dtos/src/dtos/reaction.dto';
import { Content } from 'src/submodules/backend-social-1.0-entities/src/entities/content.entity';
import { Group } from 'src/submodules/backend-social-1.0-entities/src/entities/group.entity';
import { Option } from 'src/submodules/backend-social-1.0-entities/src/entities/option.entity';
import { Reaction } from 'src/submodules/backend-social-1.0-entities/src/entities/reaction.entity';
import { User } from 'src/submodules/backend-social-1.0-entities/src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
  ) {}

  async createContent(Content: ContentDto) {
    try {
      const ContentEntity = this.contentRepository.create(Content);
      //for adding user
      const user = this.userRepository.create(Content.users[0]);
      ContentEntity.user = user;
      //for adding groupID

      if (Content.hasOwnProperty('groups')) {
        const group = this.groupRepository.create(Content.groups[0]);

        ContentEntity.group = group;
      }
      //for adding option
      if (Content.options) {
        const createdOptions = await this.optionRepository.save(
          Content.options,
        );
        ContentEntity.options = createdOptions;
      }
      const createdContent = await this.contentRepository.save(ContentEntity);
      return createdContent;
    } catch (err) {
      throw err;
    }
  }

  async updateContent(Content: ContentDto) {
    try {
      if (Content.type == 'post') {
        const updatedContent = await this.contentRepository.update(
          Content.id,
          Content,
        );
        return updatedContent;
      }

      if (Content.type == 'poll') {
        const options = await this.optionRepository.find({
          where: { content: { id: Content.id } },
        });
        console.log(options);
        const updatedOption = await this.contentRepository.preload(Content);
        const updatedContentOption = await this.contentRepository.save(
          updatedOption,
        );
        return updatedContentOption;
      }
    } catch (err) {
      throw err;
    }
  }

  async findAll() {
    try {
      const retrievedContent = await this.contentRepository.find();
      return retrievedContent;
    } catch (err) {
      throw err;
    }
  }

  async deleteContent(contentId: number) {
    try {
      const deletedOption = await this.optionRepository.find({
        where: {
          content: { id: contentId },
        },
      });
      if (deletedOption.length) {
        await this.optionRepository
          .createQueryBuilder()
          .delete()
          .from(Option)
          .where('contentId = :contentId', { contentId: contentId })
          .execute();
      }
      const deletedContent = await this.contentRepository.delete(contentId);
      return deletedContent;
    } catch (err) {
      throw err;
    }
  }

  async getContentByUser(userId: number) {
    try {
      // const fetchedContent = await this.contentRepository
      //   .createQueryBuilder('content')
      //   .select('*')
      //   .where('content.user = :userId', { userId: userId })
      //   .execute();
      const fetchedContent = await this.contentRepository.find({
        where: {
          user: { id: userId },
        },
        relations: ['options', 'reactions'],
      });
      return fetchedContent;
    } catch (error) {
      throw error;
    }
  }

  async getContentByGroup(groupId: number) {
    try {
      const fetchedContent = await this.contentRepository.find({
        where: {
          group: { id: groupId },
        },
        relations: ['options', 'reactions'],
      });
      return fetchedContent;
    } catch (error) {
      throw error;
    }
  }

  async createReaction(Reaction: ReactionDto) {
    try {
      const reactionEntity = this.reactionRepository.create(Reaction);
      reactionEntity.user = this.userRepository.create(Reaction.users[0]);
      reactionEntity.content = this.contentRepository.create(
        Reaction.contents[0],
      );
      const createdReaction = await this.reactionRepository.save(
        reactionEntity,
      );
      return createdReaction;
    } catch (error) {
      throw error;
    }
  }

  async updateReaction(Reaction: ReactionDto) {
    try {
      const updatedReaction = await this.reactionRepository.update(
        Reaction.id,
        Reaction,
      );
      return updatedReaction;
    } catch (error) {
      throw error;
    }
  }

  async deleteReaction(reactedId: number) {
    try {
      const deletedReaction = await this.reactionRepository.delete(reactedId);
      return deletedReaction;
    } catch (error) {
      throw error;
    }
  }
  async getReactionByContent(contentId: number) {
    try {
      const fetchedContentWithReaction = await this.contentRepository
        .createQueryBuilder('content')
        .leftJoinAndSelect('content.reactions', 'reaction')
        .where('content.id = :id', { id: contentId })
        .getOne();

      return fetchedContentWithReaction;
    } catch (error) {
      throw error;
    }
  }
}
