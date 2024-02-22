import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export interface ListProductCaseInterface {
  exec(data?: ProductRequest): Promise<Product[]>;
}
