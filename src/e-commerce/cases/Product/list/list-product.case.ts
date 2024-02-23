import { Product } from 'src/domain/entities/products/product.entity';
import { ListProductCaseInterface } from './list-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { ProductInterface } from '../../../../common/service-interfaces/product.repository.interface';

export class ListProduct implements ListProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductRequest): Promise<Product[]> {
    return await this.productRepository.findAll(data);
  }
}
