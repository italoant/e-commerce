import { Module } from '@nestjs/common';
import { ClientRepository } from './repositories/client.repository';
import { OrderRepository } from './repositories/order.repository';
import { OrderItemsRepository } from './repositories/order-items.repository';
import { ProductRepository } from './repositories/product.repository';
import { SalesReportRepository } from './repositories/sales-report.repository';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [
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
    PrismaService,
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
    PrismaService,
  ],
})
export class DomainModule {}
