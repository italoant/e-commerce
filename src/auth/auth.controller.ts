import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { AuthService } from './auth.service';

import { Public } from './constants/constants';
import { RegisterUser } from '../e-commerce/cases/User/register/register-user.case';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly registerUser: RegisterUser,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('login')
  async signIn(@Body() signInDto: UserRequest) {
    return await this.authService.signIn(signInDto);
  }
}
