import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/submodules/backend-social-1.0-entities/src/entities/content.entity';
import { Group } from 'src/submodules/backend-social-1.0-entities/src/entities/group.entity';
import { Option } from 'src/submodules/backend-social-1.0-entities/src/entities/option.entity';
import { Reaction } from 'src/submodules/backend-social-1.0-entities/src/entities/reaction.entity';

import { User } from 'src/submodules/backend-social-1.0-entities/src/entities/user.entity';
import ContentController from './content.controller';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Content, Option, Group, Reaction])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
