import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { UpdateOrderItemCaseInterface } from './update-order-item.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemRequest } from 'src/e-commerce/infrastructure/controllers/dto/order-item.request.dto';
import { OrderItemsInterface } from '../../../../common/service-interfaces/order-items-interface/order-items.repository.interface';

export class UpdateOrderItem implements UpdateOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemtRepository: OrderItemsInterface,
  ) {}
  async exec(data: OrderItemRequest): Promise<OrderItem> {
    return await this.orderItemtRepository.updateOrderItem(data);
  }
}
