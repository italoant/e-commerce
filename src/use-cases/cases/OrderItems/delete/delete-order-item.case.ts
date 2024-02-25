import { Inject } from '@nestjs/common';
import { DeleteOrderItemCaseInterface } from './delete-order-item.case.interface';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';

export class DeleteOrderItem implements DeleteOrderItemCaseInterface {
  constructor(
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }
}
