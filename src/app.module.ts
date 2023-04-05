import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-role.model';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { FilesModule } from './files/files.module';
import { PostsModule } from './posts/posts.module';
import { Profile } from './profiles/profile.model';
import { Post } from './posts/post.model';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tag.model';
import { TagPosts } from './tags/post-tags.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/comment.model';

@Module({
    imports:[
        ConfigModule.forRoot({
            envFilePath:`.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            database: process.env.POSTGRES_DATABASE,
            dialect: 'postgres',
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            autoLoadModels: true,
            models: [User,Role,UserRoles,Profile,Post,Tag,TagPosts,Comment],
            synchronize:true
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
      
          }),
        UsersModule,
        RolesModule,
        AuthModule,
        ProfilesModule,
        FilesModule,
        PostsModule,
        TagsModule,
        CommentsModule
    ]
})
export class AppModule {}
