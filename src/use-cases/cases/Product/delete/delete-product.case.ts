import { Inject, InternalServerErrorException } from '@nestjs/common';
import { DeleteProductCaseInterface } from './delete-product.case.interface';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { OrderItemsInterface } from '../../../../domain/repositories-interfaces/order-items.repository.interface';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';

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
        return await this.productRepository.delete(id);
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
