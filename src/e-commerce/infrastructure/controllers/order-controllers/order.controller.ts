import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteOrder } from 'src/e-commerce/cases/Order/deleteOrder/delete-order.case';
import { GetOrderById } from 'src/e-commerce/cases/Order/getOrderById/get-order-by-id.case';
import { ListOrder } from 'src/e-commerce/cases/Order/listOrder/list-order.case';
import { UpdateOrder } from 'src/e-commerce/cases/Order/updateOrder/update-order.case';
import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderRequest } from '../dto/order.request.dto';
import { GetOrderByExternalClient } from 'src/e-commerce/cases/Order/getOrderByExternalUser/get-order-by-external-user.case';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../domain/entities/users/user.entity';
import { ConfirmLastOrder } from '../../../cases/Order/confirmOrder/confirm-order';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly getOrderById: GetOrderById,
    private readonly getOrderByExternalClient: GetOrderByExternalClient,
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
  async confirmOrder(@CurrentUser() user: User): Promise<Order> {
    return await this.confirmLastOrder.exec(user);
  }

  @Get('/orders')
  async findAll(@CurrentUser() user: User): Promise<Order[]> {
    return await this.listOrders.exec(user);
  }

  @ApiBody({
    type: OrderRequest,
    required: true,
  })
  @Get('/orderId')
  async findById(
    @CurrentUser() user: User,
    @Body() data: OrderRequest,
  ): Promise<Order> {
    return await this.getOrderById.exec(user, data);
  }

  @ApiBody({
    type: OrderRequest,
    required: true,
  })
  @Get('/externalClient')
  async findByExternalClient(
    @CurrentUser() user: User,
    @Body() data: OrderRequest,
  ): Promise<Order[]> {
    return await this.getOrderByExternalClient.exec(user, data);
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
