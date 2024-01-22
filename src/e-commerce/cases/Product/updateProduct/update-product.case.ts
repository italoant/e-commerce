import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { UpdateProductCaseInterface } from './update-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export class UpdateProduct implements UpdateProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductDto): Promise<Product> {
    const { id } = data;

    const remapData = await this.remapForUpdate(data);

    return await this.productRepository.updateProduct(id, remapData);
  }

  private async remapForUpdate(data: ProductDto): Promise<ProductDto> {
    return {
      productName: data.productName,
      description: data.description,
      price: data.price,
      stockQuantity: data.stockQuantity,
    } as ProductDto;
  }
}
