import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { AuthService } from './auth.service';

import { Public } from './constants/constants';
import { ConfirmEmailCase } from '../e-commerce/cases/EmailValidator/confirmEmail/confirm-email.case';
import { CreateUserRequest } from '../e-commerce/infrastructure/controllers/dto/create-user-request.dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly confirmEmail: ConfirmEmailCase,

  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('login')
  async signIn(@Body() userInfo: UserRequest) {
    return await this.authService.signIn(userInfo);
  }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('verify')
  async verifySignIn(@Body() data: CreateUserRequest) {
    return await this.confirmEmail.exec(data)
  }

}
