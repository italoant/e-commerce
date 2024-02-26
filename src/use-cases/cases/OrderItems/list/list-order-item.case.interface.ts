import { OrderItem } from 'src/domain/entities/orderItem.entity';

export interface ListOrderItemCaseInterface {
  exec(data): Promise<OrderItem[]>;
}
