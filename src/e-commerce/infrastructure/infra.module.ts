import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user/user.repository';
import { UserController } from './controllers/user-controller/user.controller';
import { PrismaService } from 'src/prisma.service';
import { ClientRepository } from './repositories/client/client.repository';
import { ProductRepository } from './repositories/product/product.repository';
import { OrderItemsRepository } from './repositories/orderItems/order-items.repository';
import { OrderRepository } from './repositories/order/order.repository';
import { RegisterUser } from '../cases/User/register/register-user.case';
import { LoginUser } from '../cases/User/login/login.case.';
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
import { DeleteOrderItem } from '../cases/OrderItems/deleteOrderItem/delete-order-item.case';
import { GetOrderItem } from '../cases/OrderItems/getOrderItemById/get-order-item-by-id.case';
import { ListOrderItem } from '../cases/OrderItems/listOrderItem/list-order-item.case';
import { RegisterOrderItem } from '../cases/OrderItems/registerOrderItem/register-order-item.case';
import { UpdateOrderItem } from '../cases/OrderItems/updateOrderItem/update-order-item.case';
import { DeleteOrder } from '../cases/Order/deleteOrder/delete-order.case';
import { GetOrderById } from '../cases/Order/getOrderById/get-order-by-id.case';
import { ListOrder } from '../cases/Order/listOrder/list-order.case';
import { RegisterOrder } from '../cases/Order/registerOrder/register-order.case';
import { UpdateOrder } from '../cases/Order/updateOrder/update-order.case';
import { ProductController } from './controllers/product-controller/product.controller';
import { OrderController } from './controllers/order-controllers/order.controller';
import { OrderItemController } from './controllers/order-item-controller/order-item.controller';
import { GetOrderByExternalClient } from '../cases/Order/getOrderByExternalUser/get-order-by-external-user.case';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [
    UserController,
    ClientController,
    ProductController,
    OrderController,
    OrderItemController,
  ],
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
      provide: 'OrderItemInterface',
      useClass: OrderItemsRepository,
    },
    UserRepository,
    ClientRepository,
    ProductRepository,
    OrderRepository,
    OrderItemsRepository,
    PrismaService,
    JwtService,
    RegisterUser,
    LoginUser,
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
    RegisterOrder,
    GetOrderById,
    ListOrder,
    UpdateOrder,
    DeleteOrder,
    GetOrderByExternalClient,
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
      provide: 'OrderItemInterface',
      useClass: OrderItemsRepository,
    },
  ],
})
export class InfraModule {}
