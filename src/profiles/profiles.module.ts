import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/posts/post.model';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
  imports: [
    SequelizeModule.forFeature([Profile, User,Post]),
    FilesModule,
    AuthModule,
  ],
})
export class ProfilesModule {}
