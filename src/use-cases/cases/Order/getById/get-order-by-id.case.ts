import { Order } from 'src/domain/entities/order.entity';
import { GetOrderByIdCaseInterface } from './get-order-by-id.case.interface';
import { Inject } from '@nestjs/common';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';

export class GetOrderById implements GetOrderByIdCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User, id: string): Promise<Order> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.findById(id);
    }
  }
}
