import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteOrder } from 'src/e-commerce/cases/Order/delete/delete-order.case';
import { GetOrderById } from 'src/e-commerce/cases/Order/getById/get-order-by-id.case';
import { ListOrder } from 'src/e-commerce/cases/Order/list/list-order.case';
import { UpdateOrder } from 'src/e-commerce/cases/Order/updateOrder/update-order.case';
import { Order } from 'src/domain/entities/orders/order.entity';
import { OrderRequest } from './dto/Order.request.dto';
import { GetOrderByExternalClient } from 'src/e-commerce/cases/Order/getByExternalUser/get-order-by-external-user.case';
import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { User } from '../../domain/entities/users/user.entity';
import { ConfirmLastOrder } from '../../e-commerce/cases/Order/confirm/confirm-order';

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

  @ApiBody({
    type: OrderRequest,
    required: true,
  })
  @Post('/confirm')
  async confirm(@CurrentUser() user: User): Promise<Order> {
    return await this.confirmLastOrder.exec(user);
  }

  @Get('')
  async findAll(@CurrentUser() user: User): Promise<Order[]> {
    return await this.listOrders.exec(user);
  }

  @ApiBody({
    type: OrderRequest,
    required: true,
  })
  @Get('/:id')
  async findById(
    @CurrentUser() user: User,
    @Param() id: string,
  ): Promise<Order> {
    return await this.getOrderById.exec(user, id);
  }

  @Patch('/update')
  async update(
    @CurrentUser() user: User,
    @Body() data: OrderRequest,
  ): Promise<Order> {
    return await this.updateOrder.exec(user, data);
  }

  @Delete('/delete')
  async delete(
    @CurrentUser() user: User,
    @Body() data: OrderRequest,
  ): Promise<void> {
    return await this.deleteOrder.exec(user, data);
  }
}
