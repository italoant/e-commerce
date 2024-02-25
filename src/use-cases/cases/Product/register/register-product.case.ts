import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RegisterProductCaseInterface } from './register-product.case.interface';
import { Product } from 'src/domain/entities/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { ProductInterface } from '../../../../domain/repositories-interfaces/product.repository.interface';
import { StripeService } from '../../../../infrastructure/stripe-service/stripe.service';

export class RegisterProduct implements RegisterProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
    private paymentService: StripeService,
  ) {}
  async exec(user: User, data: ProductRequest): Promise<Product> {
    if (user.type === ClientType.ADMIN) {
      const product = await this.productRepository.findOne(data);

      if (!product) {
        const stripeClient = await this.paymentService.stripe();

        const product = await stripeClient.products.create({
          name: data.product_name,
        });

        await stripeClient.prices.create({
          product: product.id,
          unit_amount: Math.round(Number(data.price) * 100),
          currency: 'brl',
        });

        return await this.productRepository.create(data);
      }
    }
    throw new InternalServerErrorException(
      'apenas administradores podem criar produtos',
    );
  }
}
