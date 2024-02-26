import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfirmLastOrderInterface } from './confirm-order.interface';
import { OrderInterface } from '../../../../domain/repositories-interfaces/order.repository.interface';
import { User } from '../../../../domain/entities/user.entity';
import { GetClientByUserInterface } from '../../Client/getByUser/get-client-by-user.interfae.case';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';
import { Order } from '../../../../domain/entities/order.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PurchaseStatus } from '../../../../domain/entities/enums/order-enum';
import { Product } from '../../../../domain/entities/product.entity';

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
  async exec(user: User, paymentMethod: string): Promise<Order> {
    const client = await this.getClientByUser.exec(user);

    const order = await this.orderRepository.findByClientAndLastCreationDate(
      client.id,
    );

    if (!order) {
      throw new NotFoundException(
        `ordem nao encontrada, tente novamente ou entre em contato com o suporte`,
      );
    }

    const orderItem = await this.orderItemRepository.findByOrder(order.id);

    if (!orderItem) {
      throw new NotFoundException(
        `ordem item nao encontrada, tente novamente ou entre em contato com o suporte`,
      );
    }

    const product = await this.productRepository.findById(
      orderItem.external_product,
    );

    if (!product) {
      throw new NotFoundException(
        `produto nao encontrada, tente novamente ou entre em contato com o suporte`,
      );
    }

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
        const newData = {
          id: product.id,
          stock_quantity: product.stock_quantity - orderItem.quantity,
        } as Product;

        await this.productRepository.update(newData);

        await this.orderRepository.update({
          id: order.id,
          order_status: PurchaseStatus.EM_PREPARAÇÃO,
          external_client_id: order.id,
          payment_status: 'pagamento aceito',
          creation_date: order.creation_date,
          total_order: orderItem.subtotal,
        } as Order);
        return await this.orderRepository.findById(order.id);
      } else {
        await this.orderRepository.update({
          id: order.id,
          order_status: PurchaseStatus.ITENS_INSUFICIENTES,
          payment_status: 'cancelado pelo sistema',
          creation_date: order.creation_date,
          total_order: orderItem.subtotal,
        } as Order);
        return await this.orderRepository.findById(order.id);
      }
    }

    await this.orderRepository.update({
      id: order.id,
      order_status: PurchaseStatus.CANCELADO,
      payment_status: 'pagamento negado',
      creation_date: order.creation_date,
      total_order: orderItem.subtotal,
      external_client_id: client.id,
    } as Order);
    return await this.orderRepository.findById(order.id);
  }
}
