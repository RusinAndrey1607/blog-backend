import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString({ message: 'Name should be a string' })
  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'UserName should be a string' })
  @ApiProperty({ example: 'johndoe', description: 'Username' })
  @IsOptional()
  readonly username?: string;

  @IsString({ message: 'bio should be a string' })
  @ApiProperty({ example: 'Just bio!', description: 'Profile information' })
  @IsOptional()
  readonly bio?: string;
}
