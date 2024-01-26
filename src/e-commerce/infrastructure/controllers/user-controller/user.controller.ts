import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRequest } from '../dto/user-request.dto';
import { RegisterUser } from 'src/e-commerce/cases/User/register/register-user.case';
import { GetUser } from 'src/e-commerce/cases/User/getUser/get-user.case.';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { ListUsers } from 'src/e-commerce/cases/User/listUsers/list-users.case';
import { UpdateUser } from 'src/e-commerce/cases/User/updateUser/update-user.case';
import { DeleteUser } from 'src/e-commerce/cases/User/deleteUser/delete-user.case';
import { Public } from '../../../../auth/constants/constants';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly registerUser: RegisterUser,
    private readonly getUser: GetUser,
    private readonly listUsers: ListUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
  ) {}

  @ApiBody({
    type: CreateUserRequest,
    required: true,
  })
  @Public()
  @Post('/register')
  async createuser(@Body() createUserDto: CreateUserRequest): Promise<User> {
    return await this.registerUser.exec(createUserDto);
  }

  @Get('/users')
  async findAll(@CurrentUser() user: User): Promise<User[]> {
    return await this.listUsers.exec(user);
  }

  @Get('profile')
  async getProfile(@CurrentUser() user: User) {
    return await this.getUser.exec(user);
  }

  @Patch('/update')
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: UserRequest,
  ): Promise<User> {
    return await this.updateUser.exec(user, updateUserDto);
  }

  @Delete('/delete')
  async delete(
    @CurrentUser() user: User,
    @Body() data: UserRequest,
  ): Promise<void> {
    return await this.deleteUser.exec(user, data);
  }
}
