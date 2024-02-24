import { Product } from 'src/domain/entities/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';

export interface ListProductCaseInterface {
  exec(data?: ProductRequest): Promise<Product[]>;
}
