import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';

export interface GetOrderByExternalUserCaseInterface {
  exec(externalClient: string): Promise<Order>;
}