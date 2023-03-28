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
            models: [User,Role,UserRoles],
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
      
          }),
        UsersModule,
        RolesModule,
        AuthModule,
    ]
})
export class AppModule {}
