import { Product } from 'src/e-commerce/domain/entities/products/product.entity';

export interface ListProductCaseInterface {
  exec(): Promise<Product[]>;
}
