import { Product } from 'src/domain/entities/products/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';

export interface UpdateProductCaseInterface {
  exec(user: User, data: ProductRequest): Promise<Product>;
}
