import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { UpdateOrderItemCaseInterface } from './update-order-item.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { OrderItemDto } from 'src/e-commerce/infrastructure/controllers/dto/order-item.request.dto';

export class UpdateOrderItem implements UpdateOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
    private readonly orderItemtRepository: OrderItemsInterface,
  ) {}
  async exec(data: OrderItemDto): Promise<OrderItem> {
    return await this.orderItemtRepository.updateOrderItem(data);
  }
}
