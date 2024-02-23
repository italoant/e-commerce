import { Inject, InternalServerErrorException } from '@nestjs/common';
import { RegisterProductCaseInterface } from './register-product.case.interface';
import { Product } from 'src/domain/entities/products/product.entity';
import { ProductRequest } from 'src/infrastructure/controllers/dto/create-product.request.dto';
import { User } from '../../../../domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import Stripe from 'stripe';
import { ProductInterface } from '../../../../common/service-interfaces/product.repository.interface';

export class RegisterProduct implements RegisterProductCaseInterface {
  constructor(
    @Inject('ProductInterface')
    private readonly productRepository: ProductInterface,
  ) {}
  async exec(user: User, data: ProductRequest): Promise<Product> {
    if (user.type === ClientType.ADMIN) {
      const product = await this.productRepository.findOne(data);

      if (!product) {
        const stripeClient = new Stripe(process.env.STRIPE_SECRET, {
          apiVersion: '2023-10-16',
        });

        const product = await stripeClient.products.create({
          name: data.product_name,
        });

        await stripeClient.prices.create({
          product: product.id,
          unit_amount: Math.round(Number(data.price) * 100),
          currency: 'brl',
        });

        return await this.productRepository.createProduct(data);
      }
    }
    throw new InternalServerErrorException(
      'apenas administradores podem criar produtos',
    );
  }
}