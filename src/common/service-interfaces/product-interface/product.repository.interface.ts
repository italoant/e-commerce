import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export interface ProductInterface {
  findOne(data): Promise<Product>;
  findOneForUpdate(data): Promise<string>;
  findAll(): Promise<Product[]>;
  createProduct(data: ProductDto): Promise<Product>;
  deleteProduct(data): Promise<void>;
  updateProduct(id, updateProductDto): Promise<Product>;
}
