import { Prisma } from '@prisma/client';
import { OrderInterface } from '../../../../common/service-interfaces/order-interface/order.repository.interface';
import { OrderItemsInterface } from '../../../../common/service-interfaces/order-items-interface/order-items.repository.interface';
import { ProductInterface } from '../../../../common/service-interfaces/product-interface/product.repository.interface';
import { Client } from '../../../domain/entities/client/client.entity';
import { GetClientByUserInterface } from '../../Client/getCLientByUser/get-client-by-user.interfae.case';
import { RegisterOrderItem } from './register-order-item.case';
import { RegisterOrderItemCaseInterface } from './register-order-item.case.interface';
import { Order } from '../../../domain/entities/orders/order.entity';
import { Product } from '../../../domain/entities/products/product.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';
import { OrderItemRequest } from '../../../infrastructure/controllers/dto/order-item.request.dto';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';
import { OrderItem } from '../../../domain/entities/orderItems/orderItem.entity';

describe('create order item case', () => {
  let registerOrderItem: RegisterOrderItemCaseInterface;

  const userMock = {
    name: 'user',
    email: 'user@email.com',
    password: '12345',
    type: ClientType.ADMIN,
  } as UserRequest;

  const orderItemRequestMock = {
    external_product: 'productId',
    quantity: 1,
  } as OrderItemRequest;

  const orderItemsRepositorymock: OrderItemsInterface = {
    findById: jest.fn(),
    findByOrder: jest.fn(),
    findByProduct: jest.fn(),
    findAll: jest.fn(),
    createOrderItem: jest.fn(),
    deleteOrderItem: jest.fn(),
    updateOrderItem: jest.fn(),
  };

  const orderRepositoryMock: OrderInterface = {
    findById: jest.fn(),
    findByExternalClient: jest.fn(),
    findByClientAndLastCreationDate: jest.fn(),
    findAll: jest.fn(),
    createOrder: jest.fn(),
    deleteOrder: jest.fn(),
    updateOrder: jest.fn(),
  };

  const productRepositoryMock: ProductInterface = {
    findOne: jest.fn(),
    findByid: jest.fn(),
    findAll: jest.fn(),
    createProduct: jest.fn(),
    deleteProduct: jest.fn(),
    updateProduct: jest.fn(),
  };

  const getClientByUserMock: GetClientByUserInterface = {
    exec: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    registerOrderItem = new RegisterOrderItem(
      orderItemsRepositorymock,
      orderRepositoryMock,
      productRepositoryMock,
      getClientByUserMock,
    );

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(registerOrderItem).toBeDefined();
  });

  it('should call functions', async () => {
    jest.spyOn(getClientByUserMock, 'exec').mockResolvedValue({
      id: 'idclient',
      external_user_id: 'idUser',
      full_name: 'user name',
      contact: 11111,
      address: 'rua user',
      isActive: true,
      creation_date: new Date(),
      update_date: new Date(),
    } as Client);

    jest.spyOn(orderRepositoryMock, 'createOrder').mockResolvedValue({
      id: 'orderid',
      external_client_id: 'idclient',
      payment_status: 'aguardando pagamento',
      order_status: null,
      creation_date: new Date(),
      total_order: new Prisma.Decimal(10),
    } as Order);

    jest.spyOn(productRepositoryMock, 'findByid').mockResolvedValue({
      id: 'productId',
      product_name: 'product',
      description: 'product',
      price: new Prisma.Decimal(10),
      stock_quantity: 1,
      creation_date: new Date(),
      update_date: new Date(),
    } as Product);

    jest.spyOn(orderItemsRepositorymock, 'createOrderItem').mockResolvedValue({
      id: 'orderItemId',
      external_order: 'orderId',
      external_product: 'productId',
      quantity: 1,
      unitary_price: new Prisma.Decimal(10),
      subtotal: new Prisma.Decimal(10),
    } as OrderItem);

    const response = await registerOrderItem.exec(
      userMock,
      orderItemRequestMock,
    );

    expect(getClientByUserMock.exec).toHaveBeenCalled();
    expect(response).toBeDefined();
  });
});
