import { Inject } from '@nestjs/common';
import { RegisterProductCaseInterface } from './register-product.case.interface';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export class RegisterProduct implements RegisterProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductDto): Promise<Product> {
    const product = await this.productRepository.findOne(data);

    if (!product) {
      return await this.productRepository.createProduct(data);
    }
  }
}
