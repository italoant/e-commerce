import { Product } from 'src/domain/entities/product.entity';
import { GetProductCaseInterface } from './get-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductRequest } from '../../../../infrastructure/controllers/dto/create-product.request.dto';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';

export class GetProduct implements GetProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductRequest): Promise<Product> {
    return await this.productRepository.findOne(data);
  }
}
