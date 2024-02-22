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
import { ConfirmEmailCase } from '../e-commerce/cases/User/confirmEmail/confirm-email.case';
import { ConfirmEmailRequest } from '../e-commerce/infrastructure/controllers/dto/confirm-email.request.dto';
import { AuthGuard } from './auth.guard';
import { CurrentUser } from '../common/current-user-decorator/current-user.decorator';


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
  @Get('verify/login')
  async verifySignIn(@Body() data: ConfirmEmailRequest) {
    const confirmEmailDto = {
      name: data.name,
      email: data.email,
      code: data.code,
    } as UserRequest;
    return await this.confirmEmail.exec(confirmEmailDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() req) {
    return req;
  }
}
