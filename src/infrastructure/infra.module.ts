import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { AutorizerController } from './controllers/fake-api.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { SalesResportController } from './controllers/sales-report.controller';
import { ProfileController } from './controllers/user-profile.controller';
import { UserController } from './controllers/user.controller';
import { CommerceModule } from '../e-commerce/commerce.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    CommerceModule,
  ],
  controllers: [
    UserController,
    ClientController,
    ProfileController,
    ProductController,
    OrderController,
    OrderItemController,
    AutorizerController,
    SalesResportController,
  ],
})
export class InfraModule {}
