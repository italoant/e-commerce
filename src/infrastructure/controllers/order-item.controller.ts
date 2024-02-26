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
import { DeleteOrderItem } from 'src/use-cases/cases/OrderItems/delete/delete-order-item.case';
import { GetOrderItem } from 'src/use-cases/cases/OrderItems/getById/get-order-item-by-id.case';
import { ListOrderItem } from 'src/use-cases/cases/OrderItems/list/list-order-item.case';
import { RegisterOrderItem } from 'src/use-cases/cases/OrderItems/register/register-order-item.case';
import { UpdateOrderItem } from 'src/use-cases/cases/OrderItems/update/update-order-item.case';
import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { OrderItemRequest } from './dto/order-item.request.dto';
import { User } from '../../domain/entities/user.entity';

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
  async createOrder(
    @CurrentUser() user: User,
    @Body() data: OrderItemRequest,
  ): Promise<OrderItem> {
    return await this.registerOrderItem.exec(user, data);
  }

  @Get('/')
  async findAll(): Promise<OrderItem[]> {
    return await this.listOrderItems.exec();
  }

  @ApiParam({
    type: String,
    name: 'id',
    required: true,
  })
  @Get(':id')
  async findById(@Param('id') id:string): Promise<OrderItem> {
    return await this.getOrderItem.execById(id);
  }

  @ApiParam({
    type: String,
    name: 'id',
    required: true,
  })
  @Get('orders/:id')
  async findByOrderId(@Param('id') id: string): Promise<OrderItem> {
    return await this.getOrderItem.execByOrderId(id);
  }

  @ApiParam({
    type: OrderItemRequest,
    name: 'id',
    required: true,
  })
  @Get('/products/:id')
  async findByProductId(@Param('id') id: string): Promise<OrderItem> {
    return await this.getOrderItem.execByProductId(id);
  }

  @ApiBody({
    type: OrderItemRequest,
    required: true,
  })
  @Patch('/')
  async update(@Body() data: OrderItemRequest): Promise<OrderItem> {
    return await this.updateOrderItem.exec(data);
  }

  @ApiParam({
    type: String,
    name: 'id',
    required: true,
  })
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteOrderItem.exec(id);
  }
}
