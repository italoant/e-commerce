import { Order } from 'src/domain/entities/order.entity';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ListOrderCaseInterface } from './list-order.case.interface';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';

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
