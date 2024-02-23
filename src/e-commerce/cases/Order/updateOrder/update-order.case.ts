import { Order } from 'src/domain/entities/orders/order.entity';
import { UpdateOrderCaseInterface } from './update-order.case.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { OrderRequest } from 'src/infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { OrderInterface } from '../../../../common/service-interfaces/order.repository.interface';

export class UpdateOrder implements UpdateOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec({ type }: User, data: OrderRequest): Promise<Order> {
    if (type === ClientType.ADMIN) {
      const oldOrder = await this.orderRepository.findById(data.id);
      if (oldOrder) {
        const finalData = {
          id: data.id,
          creation_date: oldOrder.creation_date,
          external_client_id: oldOrder.external_client_id,
          order_status: data.order_status,
          total_order: data.total_order,
        } as OrderRequest;

        return await this.orderRepository.updateOrder(finalData);
      }
      throw new InternalServerErrorException(
        'erro durante processo de exclusao',
      );
    }
  }
}
