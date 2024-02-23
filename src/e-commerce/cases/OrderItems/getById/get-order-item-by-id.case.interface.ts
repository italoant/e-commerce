import { OrderItem } from 'src/domain/entities/orderItems/orderItem.entity';

export interface GetOrderItemCaseInterface {
  execById(data: string): Promise<OrderItem>;
  execByOrderId(data: string): Promise<OrderItem>;
  execByProductId(data: string): Promise<OrderItem>;
}
