import { Inject } from '@nestjs/common';
import { ProductInterface } from 'src/common/service-interfaces/product-interface/product.repository.interface';
import { DeleteProductCaseInterface } from './delete-product.case.interface';
import { ProductDto } from 'src/e-commerce/infrastructure/controllers/dto/create-product.request.dto';
import { OrderItemsInterface } from 'src/common/service-interfaces/order-items-interface/order-items.repository.interface';

export class DeleteProduct implements DeleteProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
    @Inject('OrderItemInterface')
    private readonly orderItemRepository: OrderItemsInterface,
  ) {}
  async exec(data: ProductDto): Promise<void | string> {
    const { id } = await this.productRepository.findOne(data);

    const hasOrderItem = await this.orderItemRepository.findByProduct(data.id);

    if (!hasOrderItem) {
      return await this.productRepository.deleteProduct(id);
    }

    return 'nao é possivel excluir esse item, existem items vinculados a ele';
  }
}
