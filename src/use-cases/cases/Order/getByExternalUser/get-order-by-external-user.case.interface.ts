import { Order } from 'src/domain/entities/order.entity';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';
import { User } from '../../../../domain/entities/user.entity';

export interface GetOrderByExternalUserCaseInterface {
  exec(user: User, id: string): Promise<Order[]>;
}
