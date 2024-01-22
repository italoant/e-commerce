import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';

export interface RegisterOrderItemCaseInterface {
  exec(data): Promise<OrderItem>;
}
