import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ListOrderCaseInterface } from './list-order.case.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

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
