import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { GetProductCaseInterface } from './get-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';

export class GetProduct implements GetProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data): Promise<Product> {
    return await this.productRepository.findOne(data);
  }
}
