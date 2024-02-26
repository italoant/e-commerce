import { Module } from '@nestjs/common';
import { RegisterUser } from './cases/User/register/register-user.case';
import { GetUser } from './cases/User/get/get-user.case.';
import { ListUsers } from './cases/User/list/list-users.case';
import { UpdateUser } from './cases/User/update/update-user.case';
import { DeleteUser } from './cases/User/delete/delete-user.case';
import { RegisterClient } from './cases/Client/register/register-client.case';
import { GetClient } from './cases/Client/get/get-client.case';
import { DeleteClient } from './cases/Client/delete/delete-client.case';
import { ListClients } from './cases/Client/list/list-client.case';
import { UpdateClient } from './cases/Client/update/update-client.case';
import { DeleteProduct } from './cases/Product/delete/delete-product.case';
import { GetProduct } from './cases/Product/get/get-product.case';
import { ListProduct } from './cases/Product/list/list-product.case';
import { RegisterProduct } from './cases/Product/register/register-product.case';
import { UpdateProduct } from './cases/Product/update/update-product.case';
import { DeleteOrder } from './cases/Order/delete/delete-order.case';
import { GetOrderById } from './cases/Order/getById/get-order-by-id.case';
import { ListOrder } from './cases/Order/list/list-order.case';
import { UpdateOrder } from './cases/Order/updateOrder/update-order.case';
import { GetOrderByExternalClient } from './cases/Order/getByExternalUser/get-order-by-external-user.case';
import { JwtService } from '@nestjs/jwt';
import { GetOrderItem } from './cases/OrderItems/getById/get-order-item-by-id.case';
import { DeleteOrderItem } from './cases/OrderItems/delete/delete-order-item.case';
import { UpdateOrderItem } from './cases/OrderItems/update/update-order-item.case';
import { ListOrderItem } from './cases/OrderItems/list/list-order-item.case';
import { RegisterOrderItem } from './cases/OrderItems/register/register-order-item.case';
import { GetClientByUser } from './cases/Client/getByUser/get-client-by-user.case';
import { ConfirmLastOrder } from './cases/Order/confirm/confirm-order';
import { HttpModule } from '@nestjs/axios';
import Stripe from 'stripe';
import { SalesResportCase } from './cases/report/sales-report.case';
import { VerifyPayment } from './cases/payment/verify-payment';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfirmEmailCase } from './cases/EmailValidator/confirmEmail/confirm-email.case';
import { CacheService } from '../common/auth/cache/cache.service';
import { DomainModule } from '../domain/domain.module';
import { StripeService } from '../infrastructure/stripe-service/stripe.service';
import { SendMailService } from '../infrastructure/mailer-service/mailer.service';

@Module({
  imports: [
    HttpModule,
    DomainModule,
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
      },
    }),
  ],
  providers: [
    {
      provide: 'GetClientByUserInterface',
      useClass: GetClientByUser,
    },
    SendMailService,
    StripeService,
    JwtService,
    CacheService,
    RegisterUser,
    GetUser,
    ListUsers,
    UpdateUser,
    DeleteUser,
    RegisterClient,
    GetClient,
    DeleteClient,
    ListClients,
    ConfirmEmailCase,
    UpdateClient,
    RegisterProduct,
    GetProduct,
    ListProduct,
    UpdateProduct,
    DeleteProduct,
    RegisterOrderItem,
    GetOrderItem,
    ListOrderItem,
    UpdateOrderItem,
    DeleteOrderItem,
    GetOrderById,
    ListOrder,
    UpdateOrder,
    DeleteOrder,
    GetClientByUser,
    ConfirmLastOrder,
    GetOrderByExternalClient,
    SalesResportCase,
    Stripe,
    VerifyPayment,
  ],
  exports: [
    RegisterUser,
    GetUser,
    ListUsers,
    UpdateUser,
    DeleteUser,
    GetOrderByExternalClient,
    RegisterClient,
    GetClient,
    ListClients,
    UpdateClient,
    DeleteClient,
    RegisterProduct,
    GetProduct,
    ListProduct,
    DeleteProduct,
    UpdateProduct,
    GetOrderById,
    DeleteOrder,
    UpdateOrder,
    ConfirmLastOrder,
    ListOrder,
    RegisterOrderItem,
    UpdateOrderItem,
    DeleteOrderItem,
    GetOrderItem,
    ListOrderItem,
    VerifyPayment,
    SalesResportCase,
    CacheService,
    {
      provide: 'GetClientByUserInterface',
      useClass: GetClientByUser,
    },
  ],
})
export class UseCaseModule {}
