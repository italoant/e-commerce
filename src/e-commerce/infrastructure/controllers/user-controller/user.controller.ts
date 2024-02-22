import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRequest } from '../dto/user-request.dto';
import { RegisterUser } from 'src/e-commerce/cases/User/register/register-user.case';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { ListUsers } from 'src/e-commerce/cases/User/list/list-users.case';
import { UpdateUser } from 'src/e-commerce/cases/User/update/update-user.case';
import { DeleteUser } from 'src/e-commerce/cases/User/delete/delete-user.case';
import { Public } from '../../../../auth/constants/constants';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { GetUser } from '../../../cases/User/get/get-user.case.';
import { OrderRequest } from '../dto/Order.request.dto';
import { Order } from '../../../domain/entities/orders/order.entity';
import { GetOrderByExternalClient } from '../../../cases/Order/getByExternalUser/get-order-by-external-user.case';

@Controller('users')
@ApiTags('')
export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly getUser: GetUser,
    private readonly listUsers: ListUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly getOrderByExternalClient: GetOrderByExternalClient,
  ) {}

  @ApiBody({
    type: CreateUserRequest,
    required: true,
  })
  @Public()
  @Post('/')
  async createuser(@Body() createUserDto: CreateUserRequest): Promise<User> {
    return await this.registerUser.exec(createUserDto);
  }

  @Get('/')
  async findAll(@CurrentUser() user: User): Promise<User[]> {
    return await this.listUsers.exec(user);
  }


  @ApiBody({
    type: OrderRequest,
    required: true,
  })
  @Get('/:id/orders')
  async findByExternalClient(
    @CurrentUser() user: User,
    @Param() id: string,
  ): Promise<Order[]> {
    return await this.getOrderByExternalClient.exec(user, id);
  }


  
  @Patch('/')
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: UserRequest,
  ): Promise<User> {
    return await this.updateUser.exec(user, updateUserDto);
  }

  @Delete('/:id')
  async delete(
    @CurrentUser() user: User,
    @Param() id: {id: string},
  ): Promise<void> {
    return await this.deleteUser.exec(user, id.id);
  }
}
