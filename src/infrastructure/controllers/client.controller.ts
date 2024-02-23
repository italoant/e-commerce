import { Controller, Get, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { Client } from 'src/domain/entities/client/client.entity';
import { RegisterClient } from 'src/e-commerce/cases/Client/register/register-client.case';

import { GetClient } from 'src/e-commerce/cases/Client/get/get-client.case';
import { DeleteClient } from 'src/e-commerce/cases/Client/delete/delete-client.case';
import { ListClients } from 'src/e-commerce/cases/Client/list/list-client.case';
import { UpdateClient } from 'src/e-commerce/cases/Client/update/update-client.case';

import { User } from '../../domain/entities/users/user.entity';
import { CurrentUser } from '../../common/current-user-decorator/current-user.decorator';
import { ClientRequest } from './dto/client.request.dto';
import { CreateUserRequest } from './dto/create-user-request.dto';
import { UserRequest } from './dto/user-request.dto';


@Controller('clients')
@ApiTags('client')
export class ClientController {
  constructor(
    private readonly registerClient: RegisterClient,
    private readonly getClient: GetClient,
    private readonly listClients: ListClients,
    private readonly updateClient: UpdateClient,
    private readonly deleteClient: DeleteClient,
  ) {}

  @ApiBody({
    type: CreateUserRequest,
    required: true,
  })
  @Post('/')
  async createClient(
    @CurrentUser() user: User,
    @Body() data: ClientRequest,
  ): Promise<Client> {
    return this.registerClient.exec(user, data);
  }

  @Get('/')
  findAll(@CurrentUser() user: User): Promise<Client[]> {
    return this.listClients.exec(user);
  }

  @ApiBody({
    type: UserRequest,
    required: true,
  })
  @Get('/:id')
  async getUser(
    @CurrentUser() user: User,
    @Param() {id}: {id: string},
  ): Promise<Client> {
    return await this.getClient.exec(user, id);
  }

  @Patch()
  async updateUser(
    @CurrentUser() user: User,
    @Body() data: ClientRequest,
  ): Promise<any> {
    return await this.updateClient.exec(user, data);
  }

  @Delete('/:id')
  async deleteUser(
    @CurrentUser() user: User,
    @Param() id: {id: string},
  ): Promise<void> {
    return await this.deleteClient.exec(user, id.id);
  }
}
