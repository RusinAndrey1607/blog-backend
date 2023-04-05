import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { AddCommentDto } from './dto/add-comment.dto';
import { ProfilesService } from 'src/profiles/profiles.service';
import { BanCommentDto } from './dto/ban-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private readonly profileService: ProfilesService,
  ) {}

  async addComment(dto: AddCommentDto, userId: number) {
    const author = await this.profileService.getById(userId);
    if (!author) {
      throw new HttpException(`Profile not found`, HttpStatus.BAD_REQUEST);
    }
    const comment = await this.commentRepository.create({
      ...dto,
      authorId: author.id,
    });

    return comment;
  }

  async deleteComment(commentId: number, userId: number) {
    const author = await this.profileService.getById(userId);
    if (!author) {
      throw new HttpException(`Profile not found`, HttpStatus.BAD_REQUEST);
    }
    const comment = await this.commentRepository.findByPk(commentId);

    if (!comment) {
      throw new HttpException(`Comment not found`, HttpStatus.BAD_REQUEST);
    }
    if (comment.authorId !== author.id) {
      throw new HttpException(
        `You aren't allowed to delete this comment. You aren't the author`,
        HttpStatus.FORBIDDEN,
      );
    }
    const deleted = await comment.destroy();
    return deleted;
  }

  async banComment(dto:BanCommentDto) {
    const comment = await this.commentRepository.findByPk(dto.commentId);
    if (comment) {
      comment.banned = true;
      await comment.save();
      return comment;
    }
    throw new HttpException('Comment not Found', HttpStatus.NOT_FOUND);
  }
}
