import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OrderItem } from '../../../domain/entities/orderItems/orderItem.entity';
import { Public } from '../../../../auth/constants/constants';

@Controller('fakeApi')
@ApiTags('fakeApi')
export class AutorizerController {
  constructor() {}

  @ApiBody({
    type: Boolean,
    required: true,
  })
  @Public()
  @Post('/autorizePayment')
  confirmOrder(@Body() ordermItem: OrderItem) {
    return ordermItem ? true : false;
  }
}
