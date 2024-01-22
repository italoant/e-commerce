import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';

export interface DeleteOrderCaseInterface {
  exec(data): Promise<void>;
}
