import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../domain/entities/users/user.entity';

export interface RegisterProductCaseInterface {
  exec(user: User, data: ProductRequest): Promise<Product>;
}
