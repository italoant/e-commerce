import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { DefaultInterface } from './default.repository.interface';

export interface OrderItemsInterface extends DefaultInterface<OrderItem> {
  findByOrder(id: string): Promise<OrderItem>;
  findByProduct(id: string): Promise<OrderItem>;
}
