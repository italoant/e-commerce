import { User } from '../../../../domain/entities/user.entity';
import { OrderRequest } from '../../../../infrastructure/controllers/dto/Order.request.dto';

export interface DeleteOrderCaseInterface {
  exec(user: User, data: OrderRequest): Promise<void>;
}
