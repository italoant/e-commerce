import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteOrderItem } from 'src/e-commerce/cases/OrderItems/deleteOrderItem/delete-order-item.case';
import { GetOrderItem } from 'src/e-commerce/cases/OrderItems/getOrderItemById/get-order-item-by-id.case';
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
    type: OrderItemDto,
    required: true,
  })
  @Get('/orderItem/id')
  async findById(@Body() data: OrderItemDto): Promise<OrderItem> {
    return await this.getOrderItem.execById(data.id);
  }

  @ApiBody({
    type: OrderItemDto,
    required: true,
  })
  @Get('/orderItem/orderId')
  async findByOrderId(@Body() data: OrderItemDto): Promise<OrderItem> {
    return await this.getOrderItem.execByOrderId(data.external_order);
  }

  @ApiBody({
    type: OrderItemDto,
    required: true,
  })
  @Get('/orderItem/productId')
  async findByProductId(@Body() data: OrderItemDto): Promise<OrderItem> {
    return await this.getOrderItem.execByProductId(data.external_product);
  }

  @Patch('/update')
  async update(@Body() data: OrderItemDto): Promise<OrderItem> {
    return await this.updateOrderItem.exec(data);
  }

  @Delete('/delete')
  async delete(@Body() data: OrderItemDto): Promise<void> {
    return await this.deleteOrderItem.exec(data);
  }
}
