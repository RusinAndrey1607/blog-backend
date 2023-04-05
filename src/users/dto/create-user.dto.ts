import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  @ApiProperty({ example: 'test@gmail.com', description: 'Email' })
  readonly email: string;

  @IsString({ message: 'Password should be a string' })
  @Length(4, 64, {
    message: 'Password must be at least 4 and no more than 64 characters',
  })
  @ApiProperty({ example: 'secretPassword', description: 'Password' })
  readonly password: string;
}
