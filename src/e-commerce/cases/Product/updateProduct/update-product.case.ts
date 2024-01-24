import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { UpdateProductCaseInterface } from './update-product.case.interface';
import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';

export class UpdateProduct implements UpdateProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(data: ProductRequest): Promise<Product> {
    const { id } = data;

    const remapData = await this.remapForUpdate(data);

    return await this.productRepository.updateProduct(id, remapData);
  }

  private async remapForUpdate(data: ProductRequest): Promise<ProductRequest> {
    return {
      product_name: data.product_name,
      description: data.description,
      price: data.price,
      stock_quantity: data.stock_quantity,
    } as ProductRequest;
  }
}
