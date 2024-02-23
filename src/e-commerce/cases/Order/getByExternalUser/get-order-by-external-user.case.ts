import { Order } from 'src/domain/entities/orders/order.entity';
import { Inject } from '@nestjs/common';
import { GetOrderByExternalUserCaseInterface } from './get-order-by-external-user.case.interface';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { OrderInterface } from '../../../../common/service-interfaces/order.repository.interface';

export class GetOrderByExternalClient
  implements GetOrderByExternalUserCaseInterface
{
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(
    { type }: User,
    id: string,
  ): Promise<Order[]> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.findByExternalClient(
        id,
      );
    }
  }
}
