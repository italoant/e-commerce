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

@Module({
  controllers: [UserController, ClientController],
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
