import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
      summary: 'User Login',
    })
    @Post('/login')
    login(@Body() dto: CreateUserDto) {
      return this.authService.login(dto)
    }
  
    @ApiOperation({
      summary: 'User registration',
    })
    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
      return this.authService.registration(dto)
  
    }
}
