import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { AuthService } from './auth.service';

import { Public } from './constants/constants';
import { RegisterUser } from '../e-commerce/cases/User/register/register-user.case';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly registerUser: RegisterUser,
    private mailerService: MailerService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('login')
  async signIn(@Body() signInDto: UserRequest) {
    await this.mailerService.sendMail({
      to: signInDto.email,
      from: 'e-commerce@dominio.com.br',
      subject: 'Enviando Email com NestJS',
      html: `<a href="http://localhost:3000/auth/verify/login/${signInDto.name}/${signInDto.email}/${signInDto.password}/${signInDto.type}">Website</a>`,
    });
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('verify/login/:name/:email/:password/:type')
  async verifySignIn(
    @Param('name') name: string,
    @Param('email') email: string,
    @Param('password') password: string,
    @Param('type') type: string,
  ) {
    const signInDto = {
      name: name,
      email: email,
      password: password,
      type: type,
    } as UserRequest;
    return await this.authService.signIn(signInDto);
  }
}
