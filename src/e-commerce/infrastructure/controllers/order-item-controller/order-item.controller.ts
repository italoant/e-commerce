import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { DeleteOrderItem } from 'src/e-commerce/cases/OrderItems/delete/delete-order-item.case';
import { GetOrderItem } from 'src/e-commerce/cases/OrderItems/getById/get-order-item-by-id.case';
import { ListOrderItem } from 'src/e-commerce/cases/OrderItems/list/list-order-item.case';
import { RegisterOrderItem } from 'src/e-commerce/cases/OrderItems/register/register-order-item.case';
import { UpdateOrderItem } from 'src/e-commerce/cases/OrderItems/update/update-order-item.case';
import { OrderItem } from 'src/e-commerce/domain/entities/orderItems/orderItem.entity';
import { OrderItemRequest } from '../dto/order-item.request.dto';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { UserRequest } from '../dto/user-request.dto';

@Controller('orderItems')
@ApiTags('orderItems')
export class OrderItemController {
  constructor(
    private readonly registerOrderItem: RegisterOrderItem,
    private readonly getOrderItem: GetOrderItem,
    private readonly listOrderItems: ListOrderItem,
    private readonly updateOrderItem: UpdateOrderItem,
    private readonly deleteOrderItem: DeleteOrderItem,
  ) {}

  @ApiBody({
    type: OrderItemRequest,
    required: true,
  })
  @Post('/')
  async createuser(
    @CurrentUser() user: UserRequest,
    @Body() data: OrderItemRequest,
  ): Promise<OrderItem> {
    return await this.registerOrderItem.exec(user, data);
  }

  @Get('/')
  async findAll(): Promise<OrderItem[]> {
    return await this.listOrderItems.exec();
  }

  @ApiBody({
    type: OrderItemRequest,
    required: true,
  })
  @Get('/orderItem/id')
  async findById(@Body() data: OrderItemRequest): Promise<OrderItem> {
    return await this.getOrderItem.execById(data.id);
  }

  @ApiBody({
    type: OrderItemRequest,
    required: true,
  })
  @Get('/orderItem/orderId')
  async findByOrderId(@Body() data: OrderItemRequest): Promise<OrderItem> {
    return await this.getOrderItem.execByOrderId(data.external_order);
  }

  @ApiBody({
    type: OrderItemRequest,
    required: true,
  })
  @Get('/orderItem/productId')
  async findByProductId(@Body() data: OrderItemRequest): Promise<OrderItem> {
    return await this.getOrderItem.execByProductId(data.external_product);
  }

  @Patch('/')
  async update(@Body() data: OrderItemRequest): Promise<OrderItem> {
    return await this.updateOrderItem.exec(data);
  }

  @Delete('/')
  async delete(@Body() data: OrderItemRequest): Promise<void> {
    return await this.deleteOrderItem.exec(data);
  }
}
