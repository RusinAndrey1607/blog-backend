import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagService: TagsService) {}

  @ApiSecurity('JWT-AUTH')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() dto: CreateTagDto) {
    const tag = this.tagService.createTag(dto);
    return tag;
  }
  @ApiSecurity('JWT-AUTH')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: number) {
    const tag = this.tagService.deleteTag(id);
    return tag;
  }
}
