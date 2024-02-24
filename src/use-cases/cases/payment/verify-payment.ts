import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VerifyPaymentInterface } from './verify-payment.interface';
import { StripeService } from '../../../infrastructure/stripe-service/stripe.service';

@Injectable()
export class VerifyPayment implements VerifyPaymentInterface {
  stripeClient;
  constructor(private paymentService: StripeService) {}
  async exec(data: {
    name: string;
    quantity: number;
    paymentMethod: string;
  }): Promise<boolean> {
    this.stripeClient = await this.paymentService.stripe();

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
        payment_method_types: [data.paymentMethod],
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
