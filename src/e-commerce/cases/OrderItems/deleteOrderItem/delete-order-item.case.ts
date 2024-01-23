import { Inject } from '@nestjs/common';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { DeleteOrderItemCaseInterface } from './delete-order-item.case.interface';

export class DeleteOrderItem implements DeleteOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(data): Promise<void> {
    await this.orderItemRepository.deleteOrderItem(data);
  }
}
