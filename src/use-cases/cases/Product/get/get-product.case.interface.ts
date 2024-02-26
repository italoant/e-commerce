import { Product } from 'src/domain/entities/product.entity';
import { ProductRequest } from '../../../../infrastructure/controllers/dto/create-product.request.dto';

export interface GetProductCaseInterface {
  exec(data: ProductRequest): Promise<Product>;
}
