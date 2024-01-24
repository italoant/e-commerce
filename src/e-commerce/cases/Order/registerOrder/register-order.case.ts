import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { RegisterOrderCaseInterface } from './register-order.case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OrderInterface } from 'src/common/service-interfaces/order-interface/order.repository.interface';
import { OrderRequest } from 'src/e-commerce/infrastructure/controllers/dto/Order.request.dto';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { UserInterface } from '../../../../common/service-interfaces/user-interface/user.service.interface';
import { User } from '../../../domain/entities/users/user.entity';
@Injectable()
export class RegisterOrder implements RegisterOrderCaseInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data: OrderRequest): Promise<Order> {
    const userId = await this.userRepository.findByOption(user);

    const { id } = await this.clientRepository.findOneByExternalUserId(
      userId.id,
    );

    return await this.orderRepository.createOrder(data, id);
  }
}
