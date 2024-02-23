import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { RegisterUser } from '../e-commerce/cases/User/register/register-user.case';
import { GetUser } from '../e-commerce/cases/User/get/get-user.case.';
import { ListUsers } from '../e-commerce/cases/User/list/list-users.case';
import { UpdateUser } from '../e-commerce/cases/User/update/update-user.case';
import { DeleteUser } from '../e-commerce/cases/User/delete/delete-user.case';
import { ClientController } from './controllers/client.controller';
import { RegisterClient } from '../e-commerce/cases/Client/register/register-client.case';
import { GetClient } from '../e-commerce/cases/Client/get/get-client.case';
import { DeleteClient } from '../e-commerce/cases/Client/delete/delete-client.case';
import { ListClients } from '../e-commerce/cases/Client/list/list-client.case';
import { UpdateClient } from '../e-commerce/cases/Client/update/update-client.case';
import { DeleteProduct } from '../e-commerce/cases/Product/delete/delete-product.case';
import { GetProduct } from '../e-commerce/cases/Product/get/get-product.case';
import { ListProduct } from '../e-commerce/cases/Product/list/list-product.case';
import { RegisterProduct } from '../e-commerce/cases/Product/register/register-product.case';
import { UpdateProduct } from '../e-commerce/cases/Product/update/update-product.case';
import { DeleteOrder } from '../e-commerce/cases/Order/delete/delete-order.case';
import { GetOrderById } from '../e-commerce/cases/Order/getById/get-order-by-id.case';
import { ListOrder } from '../e-commerce/cases/Order/list/list-order.case';
import { UpdateOrder } from '../e-commerce/cases/Order/updateOrder/update-order.case';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { OrderItemController } from './controllers/order-item.controller';
import { GetOrderByExternalClient } from '../e-commerce/cases/Order/getByExternalUser/get-order-by-external-user.case';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../db.service';
import { GetOrderItem } from '../e-commerce/cases/OrderItems/getById/get-order-item-by-id.case';
import { DeleteOrderItem } from '../e-commerce/cases/OrderItems/delete/delete-order-item.case';
import { UpdateOrderItem } from '../e-commerce/cases/OrderItems/update/update-order-item.case';
import { ListOrderItem } from '../e-commerce/cases/OrderItems/list/list-order-item.case';
import { RegisterOrderItem } from '../e-commerce/cases/OrderItems/register/register-order-item.case';
import { GetClientByUser } from '../e-commerce/cases/Client/getByUser/get-client-by-user.case';
import { ConfirmLastOrder } from '../e-commerce/cases/Order/confirm/confirm-order';
import { HttpModule } from '@nestjs/axios';
import { AutorizerController } from './controllers/fake-api.controller';
import Stripe from 'stripe';
import { SalesResportController } from './controllers/sales-report.controller';
import { SalesResportCase } from '../e-commerce/cases/report/sales-report.case';
import { VerifyPayment } from '../e-commerce/cases/payment/verify-payment';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfirmEmailCase } from '../e-commerce/cases/EmailValidator/confirmEmail/confirm-email.case';
import { ProfileController } from './controllers/user-profile.controller';
import { CacheService } from '../e-commerce/auth/cache/cache.service';
import { SalesReportRepository } from '../domain/repositories/sales-report/sales-report.repository';
import { ClientRepository } from '../domain/repositories/client/client.repository';
import { OrderRepository } from '../domain/repositories/order/order.repository';
import { OrderItemsRepository } from '../domain/repositories/orderItems/order-items.repository';
import { ProductRepository } from '../domain/repositories/product/product.repository';
import { UserRepository } from '../domain/repositories/user/user.repository';


@Module({
  imports: [
    HttpModule,
    CacheModule.register<RedisClientOptions>({
    store: redisStore,
    socket: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: parseInt(process.env.REDIS_PORT ?? '6379'),
    },
  }),],
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
  providers: [
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
    {
      provide: 'GetClientByUserInterface',
      useClass: GetClientByUser,
    },
    {
      provide: 'ClientInterface',
      useClass: ClientRepository,
    },
    {
      provide: 'ProductInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'OrderInterface',
      useClass: OrderRepository,
    },
    {
      provide: 'OrderItemsInterface',
      useClass: OrderItemsRepository,
    },
    {
      provide: 'SalesReportRepositoryInterface',
      useClass: SalesReportRepository,
    },
    {
      provide: 'stripeClient',
      useClass: Stripe,
    },
    UserRepository,
    ClientRepository,
    ProductRepository,
    OrderRepository,
    OrderItemsRepository,
    DbService,
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
    {
      provide: 'UserInterface',
      useClass: UserRepository,
    },
    {
      provide: 'GetClientByUserInterface',
      useClass: GetClientByUser,
    },
    {
      provide: 'ClientInterface',
      useClass: ClientRepository,
    },
    {
      provide: 'ProductInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'OrderInterface',
      useClass: OrderRepository,
    },
    {
      provide: 'OrderItemsInterface',
      useClass: OrderItemsRepository,
    },
    {
      provide: 'SalesReportRepositoryInterface',
      useClass: SalesReportRepository,
    },
    CacheService
  ],
})
export class InfraModule {}