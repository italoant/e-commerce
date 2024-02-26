import { OrderItem } from 'src/domain/entities/orderItem.entity';

export interface UpdateOrderItemCaseInterface {
  exec(data): Promise<OrderItem>;
}
