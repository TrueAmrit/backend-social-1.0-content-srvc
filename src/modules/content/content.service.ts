import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContentDto } from 'src/submodules/backend-social-1.0-dtos/src/dtos/content.dto';
import { Content } from 'src/submodules/backend-social-1.0-entities/src/entities/content.entity';
import { User } from 'src/submodules/backend-social-1.0-entities/src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createContent(Content: ContentDto) {
    try {
      const ContentEntity = this.contentRepository.create(Content);
      const user = this.userRepository.create(Content.users[0]);
      ContentEntity.user = user;
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
}
