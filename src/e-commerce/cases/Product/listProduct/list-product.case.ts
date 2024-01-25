import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ListProductCaseInterface } from './list-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export class ListProduct implements ListProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductRequest): Promise<Product[]> {
    return await this.productRepository.findAll(data);
  }
}
