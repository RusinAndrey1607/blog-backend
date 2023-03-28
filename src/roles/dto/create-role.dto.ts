import { ApiProperty } from '@nestjs/swagger';
import { IsString,Length } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Value should be a string' })
  @Length(4, 10, {
    message: 'Value must be at least 4 and no more than 10 characters',
  })
  @ApiProperty({ example: 'ADMIN', description: 'Role value' })
  readonly value: string;

  @IsString({ message: 'Description should be a string' })
  @Length(4, 30, {
    message: 'Description must be at least 4 and no more than 10 characters',
  })
  @ApiProperty({ example: 'admin', description: 'Role description' })
  readonly description: string;
}
