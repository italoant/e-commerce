import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/Order.request.dto';

export interface RegisterOrderCaseInterface {
  exec(data: OrderRequestDto): Promise<Order>;
}
