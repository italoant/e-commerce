import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { GetOrderByExternalUserCaseInterface } from './get-order-by-external-user.case.interface';
import { OrderRequest } from '../../../infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

export class GetOrderByExternalClient
  implements GetOrderByExternalUserCaseInterface
{
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(
    { type }: User,
    { external_client_id }: OrderRequest,
  ): Promise<Order[]> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.findByExternalClient(
        external_client_id,
      );
    }
  }
}
