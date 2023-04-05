import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddCommentDto } from './dto/add-comment.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { BanCommentDto } from './dto/ban-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addComment(@Body() dto: AddCommentDto,@Req() req) {
    //@ts-ignore
    const userId = req.user.id;
    const comment = this.commentService.addComment(dto, userId);
    return comment;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:commentId')
  delete(@Param("commentId") commentId: number,@Req() req) {
    //@ts-ignore
    const userId = req.user.id;
    const comment = this.commentService.deleteComment(commentId, userId);
    return comment;
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/ban")
  banComment(@Body() dto:BanCommentDto){
    const comment = this.commentService.banComment(dto)
    return comment
  }
}
