import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteOrder } from 'src/e-commerce/cases/Order/deleteOrder/delete-order.case';
import { GetOrderById } from 'src/e-commerce/cases/Order/getOrderById/get-order-by-id.case';
import { ListOrder } from 'src/e-commerce/cases/Order/listOrder/list-order.case';
import { RegisterOrder } from 'src/e-commerce/cases/Order/registerOrder/register-order.case';
import { UpdateOrder } from 'src/e-commerce/cases/Order/updateOrder/update-order.case';
import { Order } from 'src/e-commerce/domain/entities/orders/order.entity';
import { OrderRequestDto } from '../dto/Order.request.dto';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(
    private readonly registerOrder: RegisterOrder,
    private readonly getOrder: GetOrderById,
    private readonly listOrders: ListOrder,
    private readonly updateOrder: UpdateOrder,
    private readonly deleteOrder: DeleteOrder,
  ) {}

  @ApiBody({
    type: OrderRequestDto,
    required: true,
  })
  @Post('/register')
  async createuser(@Body() data: OrderRequestDto): Promise<Order> {
    return await this.registerOrder.exec(data);
  }

  @Get('/orders')
  async findAll(): Promise<Order[]> {
    return await this.listOrders.exec();
  }

  @ApiBody({
    type: OrderRequestDto,
    required: true,
  })
  @Get('/order')
  async findOne(@Body() data: OrderRequestDto): Promise<Order> {
    return await this.getOrder.exec(data.id);
  }

  @Patch('/update')
  async update(@Body() updateOrderDto): Promise<Order> {
    return await this.updateOrder.exec(updateOrderDto);
  }

  @Delete('/delete')
  async delete(@Body() data): Promise<void> {
    return await this.deleteOrder.exec(data);
  }
}
