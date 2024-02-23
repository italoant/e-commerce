import { Product } from 'src/domain/entities/products/product.entity';
import { ProductRequest } from '../../../../infrastructure/controllers/dto/create-product.request.dto';

export interface GetProductCaseInterface {
  exec(data: ProductRequest): Promise<Product>;
}
