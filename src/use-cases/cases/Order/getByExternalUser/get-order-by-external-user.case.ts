import { Order } from 'src/domain/entities/order.entity';
import { Inject } from '@nestjs/common';
import { GetOrderByExternalUserCaseInterface } from './get-order-by-external-user.case.interface';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';

export class GetOrderByExternalClient
  implements GetOrderByExternalUserCaseInterface
{
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User, id: string): Promise<Order[]> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.findByExternalClient(id);
    }
  }
}
