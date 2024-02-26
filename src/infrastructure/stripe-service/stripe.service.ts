import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentRequest } from '../controllers/dto/payment-request.dto';

@Injectable()
export class StripeService {
  stripeClient: Stripe;

  constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2023-10-16',
    });
  }

  async createProduct(productName: string, unit_amount: number) {
    try {
      const product = await this.stripeClient.products.create({
        name: productName,
      });

      await this.stripeClient.prices.create({
        product: product.id,
        unit_amount: unit_amount,
        currency: 'brl',
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Algum erro aconteceu durante a criacao do produto, erro: ${error.message}`,
      );
    }
  }

  async verifyPayment(data: PaymentRequest): Promise<boolean> {
    const productList = await this.stripeClient.products.list();

    const product = productList.data.find(
      (produtos) => produtos.name === data.name,
    );

    if (!product) {
      throw new InternalServerErrorException(
        'nao foi possivel identificar seu produto, por favor tente novamente',
      );
    }

    const priceList = await this.stripeClient.prices.list();

    const priceId = priceList.data.find((price) => {
      return product.id === price.product;
    });

    if (!priceId) {
      throw new InternalServerErrorException(
        'nao foi possivel identificar o preco do produto, por favor tente novamente',
      );
    }

    try {
      await this.stripeClient.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId.id,
            quantity: data.quantity,
          },
        ],
        mode: 'payment',
        success_url: 'https://localhos:3000/success',
        cancel_url: 'https://localhost:3000/cancel',
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Algum erro aconteceu durante a tentativa de pagamento, erro: ${error.message}`,
      );
    }
  }
}
