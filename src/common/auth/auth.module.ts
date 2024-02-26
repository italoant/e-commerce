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
import { AuthorizerPaymentMiddleware } from './middleware/authorizer-payment.middleware';
import { ClientMiddleware } from './middleware/client.middleware';
import { OrderMiddleware } from './middleware/order.middleware';
import { OrderItemMiddleware } from './middleware/order-item.middleware';
import { ProductsMiddleware } from './middleware/products.middleware';
import { UsersMiddleware } from './middleware/users.middleware';

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
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
    consumer.apply(EmailValidationMiddleware).forRoutes('auth/verify/');
    consumer.apply(AuthorizerPaymentMiddleware).forRoutes('payment/');
    consumer.apply(ClientMiddleware).forRoutes('clients/');
    consumer.apply(OrderMiddleware).forRoutes('orders/');
    consumer.apply(OrderItemMiddleware).forRoutes('orderItems/');
    consumer.apply(ProductsMiddleware).forRoutes('products/');
    consumer.apply(UsersMiddleware).forRoutes('users/');
  }
}
