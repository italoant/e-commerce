import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { GetProductCaseInterface } from './get-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { ProductRequest } from '../../../infrastructure/controllers/dto/create-product.request.dto';

export class GetProduct implements GetProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductRequest): Promise<Product> {
    return await this.productRepository.findOne(data);
  }
}
