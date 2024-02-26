import { Product } from 'src/domain/entities/product.entity';
import { UpdateProductCaseInterface } from './update-product.case.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';

export class UpdateProduct implements UpdateProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(user: User, data: ProductRequest): Promise<Product> {
    if (user.type === ClientType.ADMIN) {
      const productData = {
        id: data.id,
        product_name: data.product_name,
        description: data.description,
        price: data.price,
        stock_quantity: data.stock_quantity,
      } as Product;
      return await this.productRepository.update(productData);
    }
    throw new InternalServerErrorException(
      'você nao e um usuario do tipo admin',
    );
  }
}
