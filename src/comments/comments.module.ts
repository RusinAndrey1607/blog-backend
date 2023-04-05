import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/post.model';
import { Profile } from 'src/profiles/profile.model';
import { Comment } from './comment.model';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[SequelizeModule.forFeature([Post,Profile, Comment]),ProfilesModule,AuthModule]
})
export class CommentsModule {}
