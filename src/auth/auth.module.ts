import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InfraModule } from 'src/e-commerce/infrastructure/infra.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { RegisterUser } from '../e-commerce/cases/User/register/register-user.case';
import { JwtStrategy } from './strategies/jwt.strategies';
import { ConfirmEmailCase } from '../e-commerce/cases/User/confirmEmail/confirm-email.case';

@Module({
  imports: [
    InfraModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RegisterUser, JwtStrategy, ConfirmEmailCase],
})
export class AuthModule {}
