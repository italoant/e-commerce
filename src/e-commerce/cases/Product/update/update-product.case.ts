import { Product } from 'src/domain/entities/products/product.entity';
import { UpdateProductCaseInterface } from './update-product.case.interface';
import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { ProductInterface } from '../../../../common/service-interfaces/product.repository.interface';

export class UpdateProduct implements UpdateProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(user: User, data: ProductRequest): Promise<Product> {
    if (user.type === ClientType.ADMIN) {
      return await this.productRepository.updateProduct(data);
    }
    throw new InternalServerErrorException(
      'você nao e um usuario do tipo admin',
    );
  }
}