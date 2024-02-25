import { Product } from 'src/domain/entities/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { DefaultInterface } from './default.repository.interface';

export interface ProductInterface extends DefaultInterface<Product> {
  findOne(data: ProductRequest): Promise<Product>;
}
