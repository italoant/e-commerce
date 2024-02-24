import { Product } from 'src/domain/entities/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../../domain/entities/user.entity';

export interface RegisterProductCaseInterface {
  exec(user: User, data: ProductRequest): Promise<Product>;
}
