import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnBanUserDto } from './dto/unban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    let role;
    if (dto.email == 'admin@gmail.com') {
      role = await this.rolesService.getRoleByValue('ADMIN');
    } else {
      role = await this.rolesService.getRoleByValue('USER');
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: { all: true },
    });
    return users;
  }
  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or Role not Found', HttpStatus.NOT_FOUND);
  }
  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
  }
  async unBanUser(dto: UnBanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = false;
      user.banReason = '';
      await user.save();
      return user;
    }
    throw new HttpException('User not Found', HttpStatus.NOT_FOUND);
  }
}
