import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { GetOrderByIdCaseInterface } from './get-order-by-id.case.interface';
import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';
import { OrderRequest } from '../../../infrastructure/controllers/dto/order.request.dto';

export class GetOrderById implements GetOrderByIdCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User, { id }: OrderRequest): Promise<Order> {
    if (type === ClientType.ADMIN) {
      return await this.orderRepository.findById(id);
    }
  }
}
