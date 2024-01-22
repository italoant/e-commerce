import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ListProductCaseInterface } from './list-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';

export class ListProduct implements ListProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
}
