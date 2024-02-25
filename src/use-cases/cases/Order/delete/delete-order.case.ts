import { Inject, InternalServerErrorException } from '@nestjs/common';
import { DeleteOrderCaseInterface } from './delete-order.case.interface';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';

export class DeleteOrder implements DeleteOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User, { id }: OrderRequest): Promise<void> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.delete(id);
    }
    throw new InternalServerErrorException(
      'apenas usuarios admin podem deletar pedidos',
    );
  }
}
