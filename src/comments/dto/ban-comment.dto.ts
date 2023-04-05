import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BanCommentDto {
  @IsNumber({},{ message: "commentId should be a number" })
  @ApiProperty({ example: 1, description: 'commentId' })
  readonly commentId: number;
}
