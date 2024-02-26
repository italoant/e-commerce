import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { AutorizerController } from './controllers/authorizer.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { SalesResportController } from './controllers/sales-report.controller';
import { ProfileController } from './controllers/user-profile.controller';
import { UserController } from './controllers/user.controller';
import { UseCaseModule } from '../use-cases/usecase.module';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from '../common/auth/auth.module';

@Module({
  imports: [UseCaseModule, AuthModule],
  controllers: [
    UserController,
    ClientController,
    ProfileController,
    ProductController,
    OrderController,
    OrderItemController,
    AutorizerController,
    SalesResportController,
    AuthController,
  ],
})
export class InfraModule {}
