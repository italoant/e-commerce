import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { redisStore } from "cache-manager-redis-yet";
import { RedisClientOptions } from "redis";
import { ClientRepository } from "./repositories/client/client.repository";
import { OrderRepository } from "./repositories/order/order.repository";
import { OrderItemsRepository } from "./repositories/orderItems/order-items.repository";
import { ProductRepository } from "./repositories/product/product.repository";
import { SalesReportRepository } from "./repositories/sales-report/sales-report.repository";
import { UserRepository } from "./repositories/user/user.repository";
import { DbService } from "../db.service";

@Module({
  providers:[
    {
      provide: 'UserInterface',
      useClass: UserRepository,
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
    DbService,

  ],
  exports: [
    {
      provide: 'UserInterface',
      useClass: UserRepository,
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
    DbService
  ],
  })
  export class DomainModule {}
  