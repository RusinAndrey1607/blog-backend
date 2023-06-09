import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Roles")
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
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
