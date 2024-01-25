import { User } from '../../../domain/entities/users/user.entity';
import { OrderRequest } from '../../../infrastructure/controllers/dto/order.request.dto';

export interface DeleteOrderCaseInterface {
  exec(user: User, data: OrderRequest): Promise<void>;
}
