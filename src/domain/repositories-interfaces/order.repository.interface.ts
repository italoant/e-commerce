import { Order } from 'src/domain/entities/order.entity';
import { DefaultInterface } from './default.repository.interface';

export interface OrderInterface extends DefaultInterface<Order> {
  findByExternalClient(externalid: string): Promise<Order[]>;
  findByClientAndLastCreationDate(externalId: string): Promise<Order>;
  createOrder(id: string): Promise<Order>;
}
