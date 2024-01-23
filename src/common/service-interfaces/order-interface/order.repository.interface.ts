import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/Order.request.dto';

export interface OrderInterface {
  findById(id: string): Promise<Order>;
  findByExternalClient(externalid: string): Promise<Order[]>;
  findAll(): Promise<Order[]>;
  createOrder(data: OrderRequestDto, id: string): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
  updateOrder(data: OrderRequestDto): Promise<Order>;
}
