import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { UpdateOrderCaseInterface } from './update-order.case.interface';
import { Inject } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { OrderRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/Order.request.dto';

export class UpdateOrder implements UpdateOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
  ) {}
  async exec(data: OrderRequestDto): Promise<Order> {
    const creation_date = await this.orderRepository.findById(data.id);

    const finalData = {
      id: data.id,
      order_status: data.order_status,
      creation_date: creation_date.purchaseDate,
      total_order: data.total_order,
      external_client_id: data.external_client_id,
    } as OrderRequestDto;

    return await this.orderRepository.updateOrder(finalData);
  }
}
