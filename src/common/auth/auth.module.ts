import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';
import { LoginValidationMiddleware } from './middleware/login-validation.middleware';
import { EmailValidationMiddleware } from './middleware/email-validation.middleware';
import { ConfirmEmailCase } from '../../use-cases/cases/EmailValidator/confirmEmail/confirm-email.case';
import { RegisterUser } from '../../use-cases/cases/User/register/register-user.case';
import { UseCaseModule } from '../../use-cases/usecase.module';
import { DomainModule } from '../../domain/domain.module';
import { SendMailService } from '../../infrastructure/mailer-service/mailer.service';

@Module({
  imports: [
    UseCaseModule,
    DomainModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  providers: [
    AuthService,
    RegisterUser,
    JwtStrategy,
    ConfirmEmailCase,
    SendMailService,
  ],
  exports: [AuthService, RegisterUser, ConfirmEmailCase],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
    consumer
      .apply(EmailValidationMiddleware)
      .forRoutes('auth/verify/login/', '/auth/login/');
  }
}
