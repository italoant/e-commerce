import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { Inject } from '@nestjs/common';
import { ListOrderCaseInterface } from './list-order.case.interface';

export class ListOrder implements ListOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }
}
