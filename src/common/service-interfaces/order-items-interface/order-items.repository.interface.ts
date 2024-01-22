import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';

export interface OrderItemsInterface {
  findOne(data): Promise<OrderItem>;
  findOneForUpdate(data): Promise<string>;
  findAll(): Promise<OrderItem[]>;
  createOrderItem(data): Promise<OrderItem>;
  deleteOrderItem(data): Promise<void>;
  updateOrderItem(id, updateOrderItemDto): Promise<OrderItem>;
}
