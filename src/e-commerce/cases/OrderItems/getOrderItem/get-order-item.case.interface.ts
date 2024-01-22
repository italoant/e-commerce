import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';

export interface GetOrderItemCaseInterface {
  exec(data): Promise<OrderItem>;
}
