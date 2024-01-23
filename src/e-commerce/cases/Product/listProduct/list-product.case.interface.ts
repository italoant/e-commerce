import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export interface ListProductCaseInterface {
  exec(data?: ProductDto): Promise<Product[]>;
}
