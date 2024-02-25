import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { AuthService } from '../../common/auth/auth.service';

import { Public } from '../../common/auth/constants/constants';
import { ConfirmEmailCase } from '../../use-cases/cases/EmailValidator/confirmEmail/confirm-email.case';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EmailValidatorRequest } from './dto/email-validation.request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly confirmEmail: ConfirmEmailCase,
  ) {}

  @ApiBody({
    type: UserRequest,
    required: true,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('login')
  async signIn(@Body() userInfo: UserRequest) {
    return await this.authService.signIn(userInfo);
  }

  @ApiBody({
    type: EmailValidatorRequest,
    required: true,
  })
  @Public()
  @Post('/verify')
  async verifySignIn(@Body() data: EmailValidatorRequest) {
    return await this.confirmEmail.exec(data);
  }
}
