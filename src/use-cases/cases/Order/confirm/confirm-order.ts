import { Inject, Injectable } from '@nestjs/common';
import { ConfirmLastOrderInterface } from './confirm-order.interface';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';
import { User } from '../../../../domain/entities/user.entity';
import { GetClientByUserInterface } from '../../Client/getByUser/get-client-by-user.interfae.case';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';
import { ProductRequest } from '../../../../infrastructure/controllers/dto/create-product.request.dto';
import { Order } from '../../../../domain/entities/order.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConfirmLastOrder implements ConfirmLastOrderInterface {
  constructor(
    @Inject('OrderInterface')
    private readonly orderRepository: OrderInterface,
    @Inject('GetClientByUserInterface')
    private readonly getClientByUser: GetClientByUserInterface,
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
    private readonly httpService: HttpService,
  ) {}
  async exec(user: User, paymentMethod): Promise<Order> {
    const client = await this.getClientByUser.exec(user);

    const order = await this.orderRepository.findByClientAndLastCreationDate(
      client.id,
    );

    const orderItem = await this.orderItemRepository.findByOrder(order.id);

    const product = await this.productRepository.findById(
      orderItem.external_product,
    );

    const isConfirmed = await firstValueFrom(
      this.httpService.get('http://localhost:3000/payment', {
        data: {
          name: product.product_name,
          quantity: orderItem.quantity,
          paymentMethod: paymentMethod,
        },
      }),
    );

    if (isConfirmed.data) {
      if (product.stock_quantity - orderItem.quantity >= 0) {
        await this.productRepository.update({
          id: product.id,
          stock_quantity: product.stock_quantity - orderItem.quantity,
        } as ProductRequest);

        await this.orderRepository.update({
          id: order.id,
          order_status: 'Em preparação',
          payment_status: 'pagamento aceito',
          creation_date: order.creation_date,
          total_order: orderItem.subtotal,
        } as OrderRequest);
        return await this.orderRepository.findById(order.id);
      } else {
        await this.orderRepository.update({
          id: order.id,
          order_status: 'itens insuficientes',
          payment_status: 'cancelado pelo sistema',
          creation_date: order.creation_date,
          total_order: orderItem.subtotal,
        } as OrderRequest);
        return await this.orderRepository.findById(order.id);
      }
    }

    await this.orderRepository.update({
      id: order.id,
      order_status: 'cancelado',
      payment_status: 'pagamento negado',
      creation_date: order.creation_date,
      total_order: orderItem.subtotal,
      external_client_id: client.id,
    } as OrderRequest);
    return await this.orderRepository.findById(order.id);
  }
}
