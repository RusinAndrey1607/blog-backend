import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Title should be a string' })
  @ApiProperty({ example: 'First post', description: 'Post title' })
  readonly title: string;

  @IsString({ message: 'Content should be a string' })
  @ApiProperty({
    example: '<h1>Post content</h1>',
    description: 'Post content',
  })
  readonly content: string;

  @IsOptional()
  @ApiProperty({
    example: '[1,2,3,4,5]',
    description: 'Post tags',
  })
  readonly tags?: string;
}
