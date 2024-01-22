import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';

export interface ListOrderCaseInterface {
  exec(data): Promise<Order[]>;
}
