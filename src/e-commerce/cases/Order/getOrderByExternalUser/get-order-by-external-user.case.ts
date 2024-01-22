import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { GetOrderByExternalUserCaseInterface } from './get-order-by-external-user.case.interface';

export class GetOrderExternalClient
  implements GetOrderByExternalUserCaseInterface
{
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(externalClient: string): Promise<Order> {
    return await this.orderRepository.findByExternalClient(externalClient);
  }
}
