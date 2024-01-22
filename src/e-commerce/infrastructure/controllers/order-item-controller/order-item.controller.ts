import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteOrderItem } from 'src/e-commerce/cases/OrderItems/deleteOrderItem/delete-order-item.case';
import { GetOrderItem } from 'src/e-commerce/cases/OrderItems/getOrderItem/get-order-item.case';
import { ListOrderItem } from 'src/e-commerce/cases/OrderItems/listOrderItem/list-order-item.case';
import { RegisterOrderItem } from 'src/e-commerce/cases/OrderItems/registerOrderItem/register-order-item.case';
import { UpdateOrderItem } from 'src/e-commerce/cases/OrderItems/updateOrderItem/update-order-item.case';
import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { OrderItemDto } from '../dto/order-item.request.dto';

@Controller('orderItem')
@ApiTags('orderItem')
export class OrderItemController {
  constructor(
    private readonly registerOrderItem: RegisterOrderItem,
    private readonly getOrderItem: GetOrderItem,
    private readonly listOrderItems: ListOrderItem,
    private readonly updateOrderItem: UpdateOrderItem,
    private readonly deleteOrderItem: DeleteOrderItem,
  ) {}

  @ApiBody({
    type: OrderItemDto,
    required: true,
  })
  @Post('/register')
  async createuser(@Body() data: OrderItemDto): Promise<OrderItem> {
    return await this.registerOrderItem.exec(data);
  }

  @Get('/orderItems')
  async findAll(): Promise<OrderItem[]> {
    return await this.listOrderItems.exec();
  }

  @ApiBody({
    // type:,
    required: true,
  })
  @Get('/orderItem')
  async findOne(@Body() data): Promise<OrderItem> {
    return await this.getOrderItem.exec(data);
  }

  @Patch('/update')
  async update(@Body() updateOrderItemDto): Promise<OrderItem> {
    return await this.updateOrderItem.exec(updateOrderItemDto);
  }

  @Delete('/delete')
  async delete(@Body() data): Promise<void> {
    return await this.deleteOrderItem.exec(data);
  }
}
