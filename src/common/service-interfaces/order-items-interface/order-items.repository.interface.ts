import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';

export interface OrderItemsInterface {
  findById(id: string): Promise<OrderItem>;
  findByOrder(id: string): Promise<OrderItem>;
  findByProduct(id: string): Promise<OrderItem>;
  findAll(): Promise<OrderItem[]>;
  createOrderItem(data): Promise<OrderItem>;
  deleteOrderItem(data): Promise<void>;
  updateOrderItem(id, updateOrderItemDto): Promise<OrderItem>;
}
