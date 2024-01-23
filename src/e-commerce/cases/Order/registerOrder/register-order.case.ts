import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { RegisterOrderCaseInterface } from './register-order.case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { OrderRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/Order.request.dto';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
@Injectable()
export class RegisterOrder implements RegisterOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
  ) {}
  async exec(data: OrderRequestDto): Promise<Order> {
    const id = await this.clientRepository.findOneById(data.external_client_id);

    const remapData = await this.remapData(data);

    return await this.orderRepository.createOrder(remapData, id.id);
  }

  private async remapData(data: OrderRequestDto) {
    return {
      totalOrder: data.totalOrder,
      createAt: new Date(),
      orderStatus: data.orderStatus,
    } as OrderRequestDto;
  }
}
