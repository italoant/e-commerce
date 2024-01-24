import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserRequest } from '../dto/create-user-request.dto';
import { UserRequest } from '../dto/user-request.dto';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { RegisterClient } from 'src/e-commerce/cases/Client/register/register-client.case';
import { ClientRequest } from '../dto/client.request.dto';
import { GetClient } from 'src/e-commerce/cases/Client/get/get-client.case';
import { DeleteClient } from 'src/e-commerce/cases/Client/deleteClient/delete-client.case';
import { ListClients } from 'src/e-commerce/cases/Client/listClients/list-client.case';
import { UpdateClient } from 'src/e-commerce/cases/Client/updateClient/update-client.case';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../domain/entities/users/user.entity';

@Controller('client')
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
  @Post('/register')
  async createClient(
    @CurrentUser() user: User,
    @Body() data: ClientRequest,
  ): Promise<Client> {
    return this.registerClient.exec(user, data);
  }

  @Get('/clients')
  findAll(@CurrentUser() user: User): Promise<Client[]> {
    return this.listClients.exec(user);
  }

  @ApiBody({
    type: UserRequest,
    required: true,
  })
  @Get('/client')
  async getUser(
    @CurrentUser() user: User,
    @Body() data?: ClientRequest,
  ): Promise<Client> {
    return await this.getClient.exec(user, data);
  }

  @Patch('/update')
  async updateUser(
    @CurrentUser() user: User,
    @Body() data: ClientRequest,
  ): Promise<any> {
    return await this.updateClient.exec(user, data);
  }

  @Delete('/delete')
  async deleteUser(
    @CurrentUser() user: User,
    @Body() data: ClientRequest,
  ): Promise<void> {
    return await this.deleteClient.exec(user, data);
  }
}
