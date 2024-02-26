import { PaymentRequest } from '../../../infrastructure/controllers/dto/payment-request.dto';

export interface VerifyPaymentInterface {
  exec(data: PaymentRequest): Promise<boolean>;
}
