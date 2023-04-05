import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { Profile } from 'src/profiles/profile.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Tag } from 'src/tags/tag.model';
import { TagPosts } from 'src/tags/post-tags.model';
import { TagsModule } from 'src/tags/tags.module';
import { Comment } from 'src/comments/comment.model';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post, Profile,Tag,TagPosts,Comment]), FilesModule,AuthModule,ProfilesModule,TagsModule,CommentsModule],
})
export class PostsModule {}
