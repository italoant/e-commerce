import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';

export interface UpdateOrderCaseInterface {
  exec(data): Promise<Order>;
}
