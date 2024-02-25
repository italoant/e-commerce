import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { RegisterUser } from 'src/use-cases/cases/User/register/register-user.case';
import { User } from 'src/domain/entities/user.entity';
import { ListUsers } from 'src/use-cases/cases/User/list/list-users.case';
import { UpdateUser } from 'src/use-cases/cases/User/update/update-user.case';
import { DeleteUser } from 'src/use-cases/cases/User/delete/delete-user.case';
import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { GetUser } from '../../use-cases/cases/User/get/get-user.case.';
import { Order } from '../../domain/entities/order.entity';
import { GetOrderByExternalClient } from '../../use-cases/cases/Order/getByExternalUser/get-order-by-external-user.case';
import { Public } from '../../common/auth/constants/constants';

@Controller('users')
@ApiTags('Users')
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

  @ApiBody({
    type: User,
    required: true,
  })
  @Get('/')
  async findAll(@CurrentUser() user: User): Promise<User[]> {
    return await this.listUsers.exec(user);
  }

  @ApiParam({
    type: String,
    required: true,
    name: 'íd',
  })
  @Get('/:id/orders')
  async findByExternalClient(
    @CurrentUser() user: User,
    @Param() id: string,
  ): Promise<Order[]> {
    return await this.getOrderByExternalClient.exec(user, id);
  }

  @ApiBody({
    type: CreateUserRequest,
    required: true,
  })
  @Patch('/')
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: CreateUserRequest,
  ): Promise<User> {
    return await this.updateUser.exec(user, updateUserDto);
  }

  @ApiParam({
    type: String,
    name: 'id',
    required: true,
  })
  @Delete('/:id')
  async delete(@CurrentUser() user: User, @Param() id: string): Promise<void> {
    return await this.deleteUser.exec(user, id);
  }
}
