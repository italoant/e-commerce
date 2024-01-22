import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { GetOrderItemCaseInterface } from './get-order-item.case.interface';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { Inject } from '@nestjs/common';

export class GetOrderItem implements GetOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(data: string): Promise<OrderItem> {
    return await this.orderItemRepository.findById(data);
  }
}
