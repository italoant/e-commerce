import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VerifyPaymentInterface } from './verify-payment.interface';
import Stripe from 'stripe';

@Injectable()
export class VerifyPayment implements VerifyPaymentInterface {
  stripeClient;
  constructor() {}
  async exec(data: { name: string; quantity: number }): Promise<boolean> {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2023-10-16',
    });
    const productList = await this.stripeClient.products.list();
    const product = productList.data.find(
      (produtos) => produtos.name === data.name,
    );

    const priceList = await this.stripeClient.prices.list();

    const priceId = priceList.data.find((price) => {
      return product.id === price.product;
    });

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
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
