import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VerifyPaymentInterface } from './verify-payment.interface';
import { StripeService } from '../../../infrastructure/stripe-service/stripe.service';
import { PaymentRequest } from '../../../infrastructure/controllers/dto/payment-request.dto';

@Injectable()
export class VerifyPayment implements VerifyPaymentInterface {
  stripeClient;
  constructor(private paymentService: StripeService) {}
  async exec(data: PaymentRequest): Promise<boolean> {
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
      throw new InternalServerErrorException(
        `Algum erro aconteceu durante a tentativa de pagamento, erro: ${error.message}`,
      );
    }
  }
}
