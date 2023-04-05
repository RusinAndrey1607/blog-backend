import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/post.model';
import { Tag } from './tag.model';
import { TagPosts } from './post-tags.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports:[SequelizeModule.forFeature([Post,Tag,TagPosts]),AuthModule]
})
export class TagsModule {}
