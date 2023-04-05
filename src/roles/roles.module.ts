import { User } from './../users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './roles.model';
import { UserRoles } from './user-role.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
