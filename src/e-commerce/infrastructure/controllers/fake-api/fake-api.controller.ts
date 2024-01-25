import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { Public } from '../../../../auth/constants/constants';
import { VerifyPayment } from '../../../cases/payment/verify-payment';

@Controller('fakeApi')
@ApiTags('fakeApi')
export class AutorizerController {
  stripeClient;
  constructor(private readonly verifyPayment: VerifyPayment) {}

  @ApiBody({
    type: Boolean,
    required: true,
  })
  @Public()
  @Get('/autorizePayment')
  async confirmOrder(@Body() data: { name: string; quantity: number }) {
    return await this.verifyPayment.exec(data);
  }
}
