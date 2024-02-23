import { OrderItem } from 'src/domain/entities/orderItems/orderItem.entity';

export interface UpdateOrderItemCaseInterface {
  exec(data): Promise<OrderItem>;
}
