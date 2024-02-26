import { Product } from 'src/domain/entities/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { RepositoryInterface } from './default.repository.interface';

export interface ProductInterface extends RepositoryInterface<Product> {
  findOne(data: ProductRequest): Promise<Product>;
  findManyWithFilters(data: ProductRequest): Promise<Product[]>;
}
