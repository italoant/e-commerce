import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { OrderItem } from '../../../domain/entities/orderItems/orderItem.entity';
import { ListOrderItemCaseInterface } from './list-order-item.case.interface';

export class ListOrderItem implements ListOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(): Promise<OrderItem[]> {
    return this.orderItemRepository.findAll();
  }
}
