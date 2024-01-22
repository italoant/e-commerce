import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDto } from '../dto/create-user-request.dto';
import { UserRequestDto } from '../dto/user-request.dto';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { RegisterClient } from 'src/e-commerce/cases/Client/register/register-client.case';
import { ClientRequestDto } from '../dto/client.request.dto';
import { GetClient } from 'src/e-commerce/cases/Client/get/get-client.case';
import { DeleteClient } from 'src/e-commerce/cases/Client/deleteClient/delete-client.case';
import { ListClients } from 'src/e-commerce/cases/Client/listClients/list-client.case';
import { UpdateClient } from 'src/e-commerce/cases/Client/updateClient/update-client.case';

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
    type: CreateUserRequestDto,
    required: true,
  })
  @Post('/register')
  async createClient(@Body() data: ClientRequestDto): Promise<Client> {
    return this.registerClient.exec(data);
  }

  @Get('/clients')
  findAll(): Promise<Client[]> {
    return this.listClients.exec();
  }

  @ApiBody({
    type: UserRequestDto,
    required: true,
  })
  @Get('/client')
  async getUser(@Body() data: UserRequestDto): Promise<Client> {
    return await this.getClient.exec(data);
  }

  @Patch('/update')
  async updateUser(@Body() data: ClientRequestDto): Promise<any> {
    return await this.updateClient.exec(data);
  }

  @Delete('/delete')
  async deleteUser(@Body() id: { id: string }): Promise<void> {
    return await this.deleteClient.exec(id.id);
  }
}
