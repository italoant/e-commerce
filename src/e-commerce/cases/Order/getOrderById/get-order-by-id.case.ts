import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { GetOrderByIdCaseInterface } from './get-order-by-id.case.interface';
import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';

export class GetOrderById implements GetOrderByIdCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(id: string): Promise<Order> {
    return await this.orderRepository.findById(id);
  }
}
