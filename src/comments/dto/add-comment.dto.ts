import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString,Length } from 'class-validator';

export class AddCommentDto {
  @IsString({ message: 'Comment should be a string' })
  @Length(4,255, {
    message: 'Comment must be at least 4 and no more than 255 characters',
  })
  @ApiProperty({ example: 'This is a good post', description: 'Comment' })
  readonly comment: string;

  @IsNumber({},{ message: "postId should be a number" })
  @ApiProperty({ example: 1, description: 'postId' })
  readonly postId: number;
}
