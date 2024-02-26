import { Injectable } from '@nestjs/common';
import { VerifyPaymentInterface } from './verify-payment.interface';
import { StripeService } from '../../../infrastructure/stripe-service/stripe.service';
import { PaymentRequest } from '../../../infrastructure/controllers/dto/payment-request.dto';

@Injectable()
export class VerifyPayment implements VerifyPaymentInterface {
  constructor(private paymentService: StripeService) {}
  async exec(data: PaymentRequest): Promise<boolean> {
    return await this.paymentService.verifyPayment(data);
  }
}
