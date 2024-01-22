import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { DeleteOrderCaseInterface } from './delete-order.case.interface';

export class DeleteOrder implements DeleteOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(id: string): Promise<void> {
    await this.orderRepository.deleteOrder(id);
  }
}
