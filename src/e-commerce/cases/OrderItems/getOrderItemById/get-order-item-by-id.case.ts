import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { GetOrderItemCaseInterface } from './get-order-item-by-id.case.interface';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { Inject } from '@nestjs/common';

export class GetOrderItem implements GetOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
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
