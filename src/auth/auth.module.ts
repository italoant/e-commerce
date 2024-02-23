import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InfraModule } from 'src/e-commerce/infrastructure/infra.module';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUser } from '../e-commerce/cases/User/register/register-user.case';
import { JwtStrategy } from './strategies/jwt.strategies';
import { ConfirmEmailCase } from '../e-commerce/cases/EmailValidator/confirmEmail/confirm-email.case';
import { LoginValidationMiddleware } from './middleware/login-validation.middleware';
import { EmailValidationMiddleware } from './middleware/email-validation.middleware';

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