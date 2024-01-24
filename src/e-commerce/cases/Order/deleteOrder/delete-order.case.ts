import { Inject, InternalServerErrorException } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { DeleteOrderCaseInterface } from './delete-order.case.interface';
import { OrderRequest } from '../../../infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

export class DeleteOrder implements DeleteOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User, { id }: OrderRequest): Promise<void> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.deleteOrder(id);
    }
    throw new InternalServerErrorException(
      'apenas usuarios admin podem deletar pedidos',
    );
  }
}
