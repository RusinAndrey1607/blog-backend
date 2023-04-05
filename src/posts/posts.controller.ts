import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiSecurity("JWT-AUTH")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('/add')
  addPost(
    @Body() dto: CreatePostDto,
    @UploadedFile() image,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const post = this.postService.createPost(
      userId,
      { ...dto, tags: JSON.parse(dto.tags) },
      image,
    );
    return post;
  }

  @ApiSecurity("JWT-AUTH")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Put('/update')
  updatePost(
    @Body() dto: UpdatePostDto,
    @UploadedFile() image,
    @Req() req: Request,
  ) {
    //@ts-ignore
    const userId = req.user.id;
    const post = this.postService.updatePost(userId, dto, image);
    return post;
  }
  @Get('/')
  getByQuery(@Query() query) {
    const limit = query.limit;
    const offset = query.offset;
    if (!query.query) {
      return this.postService.getAllPosts(limit, offset);
    }
    return this.postService.getByQuery(query.query, limit, offset);
  }

  @ApiSecurity("JWT-AUTH")
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id, @Req() req: Request) {
    //@ts-ignore
    const userId = req.user.id;
    return this.postService.deletePost(id, userId);
  }
  @Get('/slug')
  getAll() {
    return this.postService.getAllSlugs();
  }
  
  @Get("/:slug")
  getOne(@Param('slug') slug) {
    const post = this.postService.getBySlug(slug)
    return post
  }

  

}
