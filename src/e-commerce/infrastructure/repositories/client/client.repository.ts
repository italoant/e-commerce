import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequest } from '../../controllers/dto/client.request.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DbService } from '../../../../db.service';

@Injectable()
export class ClientRepository implements ClientInterface {
  constructor(private readonly db: DbService) {}
  async findOneById(id: string): Promise<Client> {
    const client = await this.db.client.findFirst({
      where: {
        id: id,
      },
    });

    if (client) {
      return {
        id: client.id,
        external_user_id: client.external_user_id,
        full_name: client.full_name,
        contact: client.contact,
        address: client.address,
        isActive: client.isActive,
        creation_date: client.creation_date,
        update_date: client.update_date,
      } as Client;
      
    }
  }

  async findOneByExternalUserId(id: string): Promise<Client> {
    try {
    const client = await this.db.client.findFirst({
      where: {
        external_user_id: id,
      },
    });

    if (client) {
      return {
        id: client.id,
        external_user_id: client.external_user_id,
        full_name: client.full_name,
        contact: client.contact,
        address: client.address,
        isActive: client.isActive,
        creation_date: client.creation_date,
        update_date: client.update_date,
      } as Client;
    }
    } catch(e){
      throw new InternalServerErrorException(
        'cliente nao existe',
      );
    }
  }

  async findOneByOptions(data: ClientRequest): Promise<Client> {
    try {
      const client = await this.db.client.findFirst({
        where: {
          full_name: data.full_name,
          contact: data.contact,
          address: data.address,
          isActive: data.isActive,
        },
      });

      if (client) {
        return {
          id: client.id,
          external_user_id: client.external_user_id,
          full_name: client.full_name,
          contact: client.contact,
          address: client.address,
          isActive: client.isActive,
          creation_date: client.creation_date,
          update_date: client.update_date,
        } as Client;
      }
      
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clientList = [];
      const clients = await this.db.client.findMany();

      for (const client of clients) {
        clientList.push({
          id: client.id,
          external_user_id: client.external_user_id,
          full_name: client.full_name,
          contact: client.contact,
          address: client.address,
          isActive: client.isActive,
          creation_date: client.creation_date,
          update_date: client.update_date,
        } as Client);
      }
      return clientList;
    } catch (error) {
      return error;
    }
  }

  async createClient(data: ClientRequest, id: string): Promise<Client> {
    const remapData = {
      full_name: data.full_name,
      contact: data.contact,
      address: data.address,
      isActive: data.isActive,
      creation_date: data.creation_date,
      update_date: data.update_date,
      external_user: { connect: { id: id } },
    };

    try {
      const client = await this.db.client.create({
        data: remapData,
      });

      if (client) {
        return {
          id: client.id,
          external_user_id: client.external_user_id,
          full_name: client.full_name,
          contact: client.contact,
          address: client.address,
          isActive: client.isActive,
          creation_date: client.creation_date,
          update_date: client.update_date,
        } as Client;
      }
      
    } catch (e) {
      return e;
    }
  }
  async deleteClient(id: string): Promise<void> {
    try {
      await this.db.client.delete({
        where: {
          id: id,
        },
      });
      
    } catch (e) {
      return e;
    }
  }
  async updateClient(data: ClientRequest): Promise<Client> {
    const { id } = data;
    try {
      const updateClient = await this.db.client.update({
        where: {
          id,
        },
        data: data,
      });

      return {
        id: updateClient.id,
        external_user_id: updateClient.external_user_id,
        full_name: updateClient.full_name,
        contact: updateClient.contact,
        address: updateClient.address,
        isActive: updateClient.isActive,
        creation_date: updateClient.creation_date,
        update_date: updateClient.update_date,
      } as Client;
    } catch (e) {
      return e;
    }
  }
}
