import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { UpdateOrderItemCaseInterface } from './update-order-item.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';

export class UpdateOrderItem implements UpdateOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
    private readonly orderItemtRepository: OrderItemsInterface,
  ) {}
  async exec(data: string): Promise<OrderItem> {
    const id = '';
    return await this.orderItemtRepository.updateOrderItem(id, data);
  }
}
