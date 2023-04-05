import { ApiProperty } from '@nestjs/swagger';
import { IsString,Length } from 'class-validator';

export class CreateTagDto {
  @IsString({ message: 'tagName should be a string' })
  @Length(4, 20, {
    message: 'tagName must be at least 4 and no more than 20 characters',
  })
  @ApiProperty({ example: 'Financy', description: 'tagName' })
  readonly tagName: string;
}
