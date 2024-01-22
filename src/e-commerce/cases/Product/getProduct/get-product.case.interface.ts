import { Product } from 'src/e-commerce/domain/entities/products/product.entity';

export interface GetProductCaseInterface {
  exec(data): Promise<Product>;
}
