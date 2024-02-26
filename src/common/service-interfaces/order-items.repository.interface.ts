import { OrderItem } from 'src/domain/entities/orderItems/orderItem.entity';
import { OrderItemRequest } from 'src/infrastructure/controllers/dto/order-item.request.dto';

export interface OrderItemsInterface {
  findById(id: string): Promise<OrderItem>;
  findByOrder(id: string): Promise<OrderItem>;
  findByProduct(id: string): Promise<OrderItem>;
  findAll(): Promise<OrderItem[]>;
  createOrderItem(data): Promise<OrderItem>;
  deleteOrderItem(data): Promise<void>;
  updateOrderItem(data: OrderItemRequest): Promise<OrderItem>;
}
