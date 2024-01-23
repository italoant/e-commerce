import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../dto/user-request.dto';
import { RegisterUser } from 'src/e-commerce/cases/User/register/register-user.case';
import { GetUser } from 'src/e-commerce/cases/User/login/login.case.';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { ListUsers } from 'src/e-commerce/cases/User/listUsers/list-users.case';
import { UpdateUser } from 'src/e-commerce/cases/User/updateUser/update-user.case';
import { DeleteUser } from 'src/e-commerce/cases/User/deleteUser/delete-user.case';

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
    type: CreateUserRequestDto,
    required: true,
  })
  @Post('/register')
  async createuser(@Body() createUserDto: CreateUserRequestDto): Promise<User> {
    return await this.registerUser.exec(createUserDto);
  }

  @Get('/users')
  async findAll(): Promise<User[]> {
    return await this.listUsers.exec();
  }

  @ApiBody({
    type: UserRequestDto,
    required: true,
  })
  @Get('/user')
  async findOne(@Body() data: UserRequestDto): Promise<User> {
    return await this.getUser.exec(data);
  }

  @Patch('/update')
  async update(@Body() updateUserDto: UserRequestDto): Promise<User> {
    return await this.updateUser.exec(updateUserDto);
  }

  @Delete('/delete')
  async delete(@Body() data: UserRequestDto): Promise<void | string> {
    return await this.deleteUser.exec(data);
  }
}
