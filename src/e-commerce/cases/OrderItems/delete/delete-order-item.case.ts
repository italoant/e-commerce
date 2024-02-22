import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { DeleteOrderItemCaseInterface } from './delete-order-item.case.interface';
import { OrderItemRequest } from '../../../infrastructure/controllers/dto/order-item.request.dto';

export class DeleteOrderItem implements DeleteOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(data: OrderItemRequest): Promise<void> {
    await this.orderItemRepository.deleteOrderItem(data);
  }
}
