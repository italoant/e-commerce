import { Order } from 'src/domain/entities/order.entity';
import { User } from '../../../../domain/entities/user.entity';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';

export interface GetOrderByIdCaseInterface {
  exec(user: User, id: string): Promise<Order>;
}
