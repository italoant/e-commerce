import { Inject, InternalServerErrorException } from '@nestjs/common';
import { DeleteProductCaseInterface } from './delete-product.case.interface';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { OrderItemsInterface } from '../../../../common/service-interfaces/order-items.repository.interface';
import { ProductInterface } from '../../../../common/service-interfaces/product.repository.interface';

export class DeleteProduct implements DeleteProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
    @Inject('OrderItemsInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(user: User, id: string): Promise<void> {
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
