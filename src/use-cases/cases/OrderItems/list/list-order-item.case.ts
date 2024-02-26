import { Inject } from '@nestjs/common';
import { OrderItem } from '../../../../domain/entities/orderItem.entity';
import { ListOrderItemCaseInterface } from './list-order-item.case.interface';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';

export class ListOrderItem implements ListOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }
}
