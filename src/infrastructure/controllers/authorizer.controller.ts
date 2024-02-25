import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { VerifyPayment } from '../../use-cases/cases/payment/verify-payment';
import { Public } from '../../common/auth/constants/constants';
import { PaymentRequest } from './dto/payment-request.dto';

@Controller('payment')
@ApiTags('payment')
export class AutorizerController {
  constructor(private readonly verifyPayment: VerifyPayment) {}

  @ApiBody({
    type: PaymentRequest,
    required: true,
  })
  @Public()
  @Get('/')
  async confirmOrder(@Body() data: PaymentRequest) {
    return await this.verifyPayment.exec(data);
  }
}
