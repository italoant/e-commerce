import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RegisterProductCaseInterface } from './register-product.case.interface';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { Product } from 'src/e-commerce/domain/entities/products/product.entity';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

export class RegisterProduct implements RegisterProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(user: User, data: ProductRequest): Promise<Product> {
    if (user.type === ClientType.ADMIN) {
      const product = await this.productRepository.findOne(data);

      if (!product) {
        return await this.productRepository.createProduct(data);
      }
    }
    throw new InternalServerErrorException(
      'apenas administradores podem criar produtos',
    );
  }
}
