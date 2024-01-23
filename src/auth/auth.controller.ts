import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('login')
  async signIn(@Body() signInDto: UserRequestDto) {
    return await this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
