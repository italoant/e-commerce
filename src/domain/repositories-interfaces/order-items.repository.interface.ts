import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { RepositoryInterface } from './default.repository.interface';

export interface OrderItemsInterface extends RepositoryInterface<OrderItem> {
  findByOrder(id: string): Promise<OrderItem>;
  findByProduct(id: string): Promise<OrderItem>;
}
