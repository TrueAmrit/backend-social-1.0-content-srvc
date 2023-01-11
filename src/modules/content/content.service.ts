import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentDto } from 'src/submodules/backend-social-1.0-dtos/src/dtos/content.dto';
import { Content } from 'src/submodules/backend-social-1.0-entities/src/entities/content.entity';
import { Option } from 'src/submodules/backend-social-1.0-entities/src/entities/option.entity';
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
  ) {}

  async createContent(Content: ContentDto) {
    try {
      const ContentEntity = this.contentRepository.create(Content);
      const user = this.userRepository.create(Content.users[0]);
      ContentEntity.user = user;
      //for adding option
      const createdOptions = await this.optionRepository.save(Content.options);
      ContentEntity.options = createdOptions;
      const createdContent = await this.contentRepository.save(ContentEntity);
      return createdContent;
    } catch (err) {
      throw err;
    }
  }

  async updateContent(Content: ContentDto) {
    try {
      const updatedContent = await this.contentRepository.update(
        Content.id,
        Content,
      );
      return updatedContent;
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

  async deleteContent(ContentId: number) {
    try {
      const deletedContent = await this.contentRepository.delete(ContentId);
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
        relations: ['options'],
      });
      return fetchedContent;
    } catch (error) {
      throw error;
    }
  }
}
