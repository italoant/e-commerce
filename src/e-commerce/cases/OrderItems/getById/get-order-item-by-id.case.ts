import { OrderItem } from 'src/domain/entities/orderItems/orderItem.entity';
import { GetOrderItemCaseInterface } from './get-order-item-by-id.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from '../../../../common/service-interfaces/order-items.repository.interface';

export class GetOrderItem implements GetOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async execById(id: string): Promise<OrderItem> {
    return await this.orderItemRepository.findById(id);
  }
  async execByOrderId(id: string): Promise<OrderItem> {
    return await this.orderItemRepository.findByOrder(id);
  }
  async execByProductId(id: string): Promise<OrderItem> {
    return await this.orderItemRepository.findByProduct(id);
  }
}
