import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OrderItem } from '../../../domain/entities/orderItems/orderItem.entity';
import { Public } from '../../../../auth/constants/constants';
import Stripe from 'stripe';

@Controller('fakeApi')
@ApiTags('fakeApi')
export class AutorizerController {
  constructor(private readonly stripe: Stripe) {}

  @ApiBody({
    type: Boolean,
    required: true,
  })
  @Public()
  @Post('/autorizePayment')
  async confirmOrder(@Body() data: { quantity: number; price: number }) {
    // const session = await this.stripe.checkout.sessions.create({
    //   line_items: [{ price: String(data.price), quantity: data.quantity }],
    //   mode: 'payment',
    //   payment_intent_data: {
    //     setup_future_usage: 'on_session',
    //   },
    //   customer: pay_details.stripe_customer_id,
    //   success_url:
    //     env.EnvConfiguration.DB.SC_BE_HOST +
    //     '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
    //   cancel_url:
    //     env.EnvConfiguration.DB.SC_BE_HOST + '/pay/failed/checkout/session',
    // });
  }
}
