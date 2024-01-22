import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { DeleteProductCaseInterface } from './delete-product.case.interface';
import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export class DeleteProduct implements DeleteProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductDto): Promise<void> {
    const { id } = await this.productRepository.findOne(data);

    return await this.productRepository.deleteProduct(id);
  }
}
