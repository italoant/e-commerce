import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserInterface } from 'src/common/service-interfaces/login-interface/login.service.interface';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject('UserInterface')
    private readonly userService: UserInterface,
  ) {}

  @ApiBody({
    type: CreateLoginDto,
    required: true,
  })
  @Post('/register')
  async createuser(@Body() createLoginDto: CreateLoginDto) {
    return await this.userService.createUser(createLoginDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiParam({
    name: 'login',
    required: true,
    example: 'usuario',
  })
  @ApiParam({
    name: 'email',
    required: true,
    example: 'user@email.com',
  })
  @ApiParam({
    name: 'password',
    required: true,
    example: '123456',
  })
  @Get('/:login/:email:senha')
  async getUserToLogin(
    @Param('login') login: string,
    @Param('email') email: string,
    @Param('password') password: string,
  ): Promise<any> {
    return await this.userService.findOne(login, email, password);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateLoginDto: UpdateLoginDto,
  ) {
    return await this.userService.updateUser(id, updateLoginDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
