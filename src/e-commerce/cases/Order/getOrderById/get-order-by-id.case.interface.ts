import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';

export interface GetOrderByIdCaseInterface {
  exec(id: string): Promise<Order>;
}
