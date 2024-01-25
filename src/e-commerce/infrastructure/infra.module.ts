import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user/user.repository';
import { UserController } from './controllers/user-controller/user.controller';
import { ClientRepository } from './repositories/client/client.repository';
import { ProductRepository } from './repositories/product/product.repository';
import { OrderItemsRepository } from './repositories/orderItems/order-items.repository';
import { OrderRepository } from './repositories/order/order.repository';
import { RegisterUser } from '../cases/User/register/register-user.case';
import { GetUser } from '../cases/User/getUser/get-user.case.';
import { ListUsers } from '../cases/User/listUsers/list-users.case';
import { UpdateUser } from '../cases/User/updateUser/update-user.case';
import { DeleteUser } from '../cases/User/deleteUser/delete-user.case';
import { ClientController } from './controllers/cliente-controller/client.controller';
import { RegisterClient } from '../cases/Client/register/register-client.case';
import { GetClient } from '../cases/Client/get/get-client.case';
import { DeleteClient } from '../cases/Client/deleteClient/delete-client.case';
import { ListClients } from '../cases/Client/listClients/list-client.case';
import { UpdateClient } from '../cases/Client/updateClient/update-client.case';
import { DeleteProduct } from '../cases/Product/deleteProduct/delete-product.case';
import { GetProduct } from '../cases/Product/getProduct/get-product.case';
import { ListProduct } from '../cases/Product/listProduct/list-product.case';
import { RegisterProduct } from '../cases/Product/registerProduct/register-product.case';
import { UpdateProduct } from '../cases/Product/updateProduct/update-product.case';
import { DeleteOrder } from '../cases/Order/deleteOrder/delete-order.case';
import { GetOrderById } from '../cases/Order/getOrderById/get-order-by-id.case';
import { ListOrder } from '../cases/Order/listOrder/list-order.case';
import { UpdateOrder } from '../cases/Order/updateOrder/update-order.case';
import { ProductController } from './controllers/product-controller/product.controller';
import { OrderController } from './controllers/order-controllers/order.controller';
import { OrderItemController } from './controllers/order-item-controller/order-item.controller';
import { GetOrderByExternalClient } from '../cases/Order/getOrderByExternalUser/get-order-by-external-user.case';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { GetOrderItem } from '../cases/OrderItems/getOrderItemById/get-order-item-by-id.case';
import { DeleteOrderItem } from '../cases/OrderItems/deleteOrderItem/delete-order-item.case';
import { UpdateOrderItem } from '../cases/OrderItems/updateOrderItem/update-order-item.case';
import { ListOrderItem } from '../cases/OrderItems/listOrderItem/list-order-item.case';
import { RegisterOrderItem } from '../cases/OrderItems/registerOrderItem/register-order-item.case';
import { GetClientByUser } from '../cases/Client/getCLientByUser/get-client-by-user.case';
import { ConfirmLastOrder } from '../cases/Order/confirmOrder/confirm-order';
import { HttpModule } from '@nestjs/axios';
import { AutorizerController } from './controllers/fake-api/fake-api.controller';
import Stripe from 'stripe';
import { SalesResportController } from './controllers/sales-report-controller/sales-report.controller';
import { SalesResportCase } from '../cases/report/sales-report.case';
import { SalesReportRepository } from './repositories/sales-report/sales-report.repository';

@Module({
  imports: [HttpModule],
  controllers: [
    UserController,
    ClientController,
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
    UserRepository,
    ClientRepository,
    ProductRepository,
    OrderRepository,
    OrderItemsRepository,
    PrismaService,
    JwtService,
    RegisterUser,
    GetUser,
    ListUsers,
    UpdateUser,
    DeleteUser,
    RegisterClient,
    GetClient,
    DeleteClient,
    ListClients,
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
  ],
})
export class InfraModule {}
