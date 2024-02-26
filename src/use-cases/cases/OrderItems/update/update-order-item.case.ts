import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { UpdateOrderItemCaseInterface } from './update-order-item.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemRequest } from 'src/infrastructure/controllers/dto/order-item.request.dto';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';

export class UpdateOrderItem implements UpdateOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemtRepository: OrderItemsInterface,
  ) {}
  async exec(data: OrderItemRequest): Promise<OrderItem> {
    const newOrderItem = {
      id: data.id,
      external_order: data.external_order,
      external_product: data.external_product,
      quantity: data.quantity,
      unitary_price: data.unitary_price,
      subtotal: data.subtotal,
    } as OrderItem;

    return await this.orderItemtRepository.update(newOrderItem);
  }
}
