import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '../../infrastructure/controllers/auth.controller';
import { AuthService } from './auth.service';
import { InfraModule } from 'src/infrastructure/infra.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';
import { LoginValidationMiddleware } from './middleware/login-validation.middleware';
import { EmailValidationMiddleware } from './middleware/email-validation.middleware';
import { ConfirmEmailCase } from '../cases/EmailValidator/confirmEmail/confirm-email.case';
import { RegisterUser } from '../cases/User/register/register-user.case';


@Module({
  imports: [
    InfraModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, RegisterUser, JwtStrategy, ConfirmEmailCase],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
    consumer.apply(EmailValidationMiddleware).forRoutes('auth/verify/login/', '/auth/login/');
  }
}