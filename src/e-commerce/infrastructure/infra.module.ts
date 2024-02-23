import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user/user.repository';
import { UserController } from './controllers/user-controller/user.controller';
import { ClientRepository } from './repositories/client/client.repository';
import { ProductRepository } from './repositories/product/product.repository';
import { OrderItemsRepository } from './repositories/orderItems/order-items.repository';
import { OrderRepository } from './repositories/order/order.repository';
import { RegisterUser } from '../cases/User/register/register-user.case';
import { GetUser } from '../cases/User/get/get-user.case.';
import { ListUsers } from '../cases/User/list/list-users.case';
import { UpdateUser } from '../cases/User/update/update-user.case';
import { DeleteUser } from '../cases/User/delete/delete-user.case';
import { ClientController } from './controllers/cliente-controller/client.controller';
import { RegisterClient } from '../cases/Client/register/register-client.case';
import { GetClient } from '../cases/Client/get/get-client.case';
import { DeleteClient } from '../cases/Client/delete/delete-client.case';
import { ListClients } from '../cases/Client/list/list-client.case';
import { UpdateClient } from '../cases/Client/update/update-client.case';
import { DeleteProduct } from '../cases/Product/delete/delete-product.case';
import { GetProduct } from '../cases/Product/get/get-product.case';
import { ListProduct } from '../cases/Product/list/list-product.case';
import { RegisterProduct } from '../cases/Product/register/register-product.case';
import { UpdateProduct } from '../cases/Product/update/update-product.case';
import { DeleteOrder } from '../cases/Order/delete/delete-order.case';
import { GetOrderById } from '../cases/Order/getById/get-order-by-id.case';
import { ListOrder } from '../cases/Order/list/list-order.case';
import { UpdateOrder } from '../cases/Order/updateOrder/update-order.case';
import { ProductController } from './controllers/product-controller/product.controller';
import { OrderController } from './controllers/order-controllers/order.controller';
import { OrderItemController } from './controllers/order-item-controller/order-item.controller';
import { GetOrderByExternalClient } from '../cases/Order/getByExternalUser/get-order-by-external-user.case';
import { JwtService } from '@nestjs/jwt';
import { DbService } from '../../db.service';
import { GetOrderItem } from '../cases/OrderItems/getById/get-order-item-by-id.case';
import { DeleteOrderItem } from '../cases/OrderItems/delete/delete-order-item.case';
import { UpdateOrderItem } from '../cases/OrderItems/update/update-order-item.case';
import { ListOrderItem } from '../cases/OrderItems/list/list-order-item.case';
import { RegisterOrderItem } from '../cases/OrderItems/register/register-order-item.case';
import { GetClientByUser } from '../cases/Client/getByUser/get-client-by-user.case';
import { ConfirmLastOrder } from '../cases/Order/confirm/confirm-order';
import { HttpModule } from '@nestjs/axios';
import { AutorizerController } from './controllers/fake-api/fake-api.controller';
import Stripe from 'stripe';
import { SalesResportController } from './controllers/sales-report-controller/sales-report.controller';
import { SalesResportCase } from '../cases/report/sales-report.case';
import { SalesReportRepository } from './repositories/sales-report/sales-report.repository';
import { VerifyPayment } from '../cases/payment/verify-payment';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from '../../auth/cache/cache.service';
import { ConfirmEmailCase } from '../cases/EmailValidator/confirmEmail/confirm-email.case';
import { ProfileController } from './controllers/user-profile/user-profile';

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
