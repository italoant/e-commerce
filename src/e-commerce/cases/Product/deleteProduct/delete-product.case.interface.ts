import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../domain/entities/users/user.entity';

export interface DeleteProductCaseInterface {
  exec(user: User, data: ProductRequest): Promise<void | string>;
}
