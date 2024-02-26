import { Order } from 'src/domain/entities/orders/order.entity';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ListOrderCaseInterface } from './list-order.case.interface';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { OrderInterface } from '../../../../common/service-interfaces/order.repository.interface';

export class ListOrder implements ListOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User): Promise<Order[]> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.findAll();
    }
    throw new InternalServerErrorException(
      'apenas usuarios admin podem ver todos pedidos',
    );
  }
}
