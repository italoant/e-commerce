import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export interface ProductInterface {
  findOne(data: ProductRequest): Promise<Product>;
  findByid(id: string): Promise<Product>;
  findAll(data?: ProductRequest): Promise<Product[]>;
  createProduct(data: ProductRequest): Promise<Product>;
  deleteProduct(data): Promise<void>;
  updateProduct(updateProductRequest: ProductRequest): Promise<Product>;
}
