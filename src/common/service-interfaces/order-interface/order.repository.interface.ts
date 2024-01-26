import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderRequest } from 'src/e-commerce/infrastructure/controllers/dto/order.request.dto';

export interface OrderInterface {
  findById(id: string): Promise<Order>;
  findByExternalClient(externalid: string): Promise<Order[]>;
  findByClientAndLastCreationDate(externalId: string): Promise<Order>;
  findAll(): Promise<Order[]>;
  createOrder(id: string): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
  updateOrder(data: OrderRequest): Promise<Order>;
}
