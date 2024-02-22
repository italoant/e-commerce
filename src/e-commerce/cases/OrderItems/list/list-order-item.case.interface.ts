import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';

export interface ListOrderItemCaseInterface {
  exec(data): Promise<OrderItem[]>;
}
