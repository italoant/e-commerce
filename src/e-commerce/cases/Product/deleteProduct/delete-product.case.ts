import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { DeleteProductCaseInterface } from './delete-product.case.interface';
import { ProductRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientType } from '../../../domain/entities/users/user-enum';

export class DeleteProduct implements DeleteProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(user: User, { id }: ProductRequest): Promise<void> {
    if (user.type === ClientType.ADMIN) {
      const hasOrderItemRequest =
        await this.orderItemRepository.findByProduct(id);

      if (!hasOrderItemRequest) {
        return await this.productRepository.deleteProduct(id);
      }
      throw new InternalServerErrorException(
        'existem items vinculados a este produto',
      );
    }
    throw new InternalServerErrorException(
      'você não é um usuario do tipo admin',
    );
  }
}
