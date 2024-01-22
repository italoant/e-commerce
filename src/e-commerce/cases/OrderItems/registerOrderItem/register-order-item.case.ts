import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { RegisterOrderItemCaseInterface } from './register-order-item.case.interface';
import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { OrderItemDto } from 'src/e-commerce/infrastructure/controllers/dto/order-item.request.dto';

export class RegisterOrderItem implements RegisterOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(data: OrderItemDto): Promise<OrderItem> {
    return this.orderItemRepository.createOrderItem(data);
  }
}
