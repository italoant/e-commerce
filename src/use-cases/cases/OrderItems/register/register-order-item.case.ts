import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { RegisterOrderItemCaseInterface } from './register-order-item.case.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { OrderItemRequest } from '../../../../infrastructure/controllers/dto/order-item.request.dto';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';
import { Prisma } from '@prisma/client';
import { GetClientByUserInterface } from '../../Client/getByUser/get-client-by-user.interfae.case';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';
import { User } from '../../../../domain/entities/user.entity';

export class RegisterOrderItem implements RegisterOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
    @Inject('GetClientByUserInterface')
    private readonly getClientByUser: GetClientByUserInterface,
  ) {}
  async exec(user: User, data: OrderItemRequest): Promise<OrderItem> {
    const client = await this.getClientByUser.exec(user);

    const createOrder = await this.orderRepository.createOrder(client.id);

    const product = await this.productRepository.findById(
      data.external_product,
    );
    const finalData = {
      external_order: createOrder.id,
      external_product: data.external_product,
      quantity: data.quantity,
      unitary_price: product.price,
      subtotal: new Prisma.Decimal(data.quantity * Number(product.price)),
    } as OrderItem;

    if (createOrder && product && client) {
      return await this.orderItemRepository.create(finalData);
    }
    throw new InternalServerErrorException('erro durante a criação de item');
  }
}
