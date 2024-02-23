import { OrderItem } from 'src/domain/entities/orderItems/orderItem.entity';

export interface ListOrderItemCaseInterface {
  exec(data): Promise<OrderItem[]>;
}
