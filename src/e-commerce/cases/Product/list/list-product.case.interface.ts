import { Product } from 'src/domain/entities/products/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';

export interface ListProductCaseInterface {
  exec(data?: ProductRequest): Promise<Product[]>;
}
