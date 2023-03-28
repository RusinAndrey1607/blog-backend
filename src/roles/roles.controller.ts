import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post('/')
  create(@Body() roleDto: CreateRoleDto) {
    const role = this.rolesService.create(roleDto);
    return role;
  }
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    const role = this.rolesService.getRoleByValue(value);
    return role;
  }
}
