import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ example: 'Spam', description: 'spam' })
  @IsString({ message: 'BanReason value must be as string' })
  readonly banReason: string;
  
  @ApiProperty({ example: 1, description: 'userId' })
  @IsNumber({}, { message: 'UserId must be a number' })
  readonly userId: number;
}
