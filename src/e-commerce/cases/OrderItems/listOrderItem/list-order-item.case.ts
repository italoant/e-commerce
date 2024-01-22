import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { ListOrderItemCaseInterface } from './list-order-item.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';

export class ListOrderItem implements ListOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }
}
