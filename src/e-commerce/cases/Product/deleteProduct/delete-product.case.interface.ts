import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export interface DeleteProductCaseInterface {
  exec(data: ProductDto): Promise<void>;
}
