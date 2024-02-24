import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { VerifyPayment } from '../../use-cases/cases/payment/verify-payment';
import { Public } from '../../common/auth/constants/constants';

@Controller('payment')
@ApiTags('payment')
export class AutorizerController {
  stripeClient;
  constructor(private readonly verifyPayment: VerifyPayment) {}

  @ApiBody({
    type: Boolean,
    required: true,
  })
  @Public()
  @Get('/')
  async confirmOrder(
    @Body() data: { name: string; quantity: number; paymentMethod: string },
  ) {
    return await this.verifyPayment.exec(data);
  }
}
