import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { UpdateOrderCaseInterface } from './update-order.case.interface';
import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';

export class UpdateOrder implements UpdateOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(data: string): Promise<Order> {
    const id = '';
    return await this.orderRepository.updateOrder(id, data);
  }
}
