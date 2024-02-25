import { Order } from 'src/domain/entities/order.entity';
import { RepositoryInterface } from './default.repository.interface';

export interface OrderInterface extends RepositoryInterface<Order> {
  findByExternalClient(externalid: string): Promise<Order[]>;
  findByClientAndLastCreationDate(externalId: string): Promise<Order>;
  createOrder(id: string): Promise<Order>;
}
