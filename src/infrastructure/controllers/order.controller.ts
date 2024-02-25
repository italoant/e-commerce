import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { DeleteOrder } from 'src/use-cases/cases/Order/delete/delete-order.case';
import { GetOrderById } from 'src/use-cases/cases/Order/getById/get-order-by-id.case';
import { ListOrder } from 'src/use-cases/cases/Order/list/list-order.case';
import { UpdateOrder } from 'src/use-cases/cases/Order/updateOrder/update-order.case';
import { Order } from 'src/domain/entities/order.entity';
import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { ConfirmLastOrder } from '../../use-cases/cases/Order/confirm/confirm-order';
import { OrderRequest } from './dto/Order.request.dto';
import { User } from '../../domain/entities/user.entity';

@Controller('orders')
@ApiTags('orders')
export class OrderController {
  constructor(
    private readonly getOrderById: GetOrderById,
    private readonly confirmLastOrder: ConfirmLastOrder,
    private readonly listOrders: ListOrder,
    private readonly updateOrder: UpdateOrder,
    private readonly deleteOrder: DeleteOrder,
  ) {}

  @ApiParam({
    type: String,
    name: 'paymentMethod',
    required: true,
  })
  @Post('/confirm/:paymentMethod')
  async confirm(
    @CurrentUser() user: User,
    @Param() paymentMethod: string,
  ): Promise<Order> {
    return await this.confirmLastOrder.exec(user, paymentMethod);
  }

  @Get('')
  async findAll(@CurrentUser() user: User): Promise<Order[]> {
    return await this.listOrders.exec(user);
  }

  @ApiParam({
    type: String,
    name: 'id',
    required: true,
  })
  @Get('/:id')
  async findById(
    @CurrentUser() user: User,
    @Param() id: string,
  ): Promise<Order> {
    return await this.getOrderById.exec(user, id);
  }

  @ApiBody({
    type: OrderRequest,
    required: true,
  })
  @Patch('/update')
  async update(
    @CurrentUser() user: User,
    @Body() data: OrderRequest,
  ): Promise<Order> {
    return await this.updateOrder.exec(user, data);
  }

  @ApiParam({
    type: String,
    name: 'id',
    required: true,
  })
  @Delete('/delete')
  async delete(@CurrentUser() user: User, @Param() id: string): Promise<void> {
    return await this.deleteOrder.exec(user, id);
  }
}
