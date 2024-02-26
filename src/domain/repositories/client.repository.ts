import { Client } from 'src/domain/entities/client.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { ClientRequest } from '../../infrastructure/controllers/dto/client.request.dto';
import { ClientInterface } from '../repositories-interfaces/client.repository.interface';

@Injectable()
export class ClientRepository implements ClientInterface {
  constructor(private readonly db: PrismaService) {}

  async findById(id: string): Promise<Client> {
    try {
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
    } catch (e) {
      throw new InternalServerErrorException(`Client nao existe, error: ${e}`);
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
    } catch (e) {
      throw new InternalServerErrorException(`Client nao existe, error: ${e}`);
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
      throw new InternalServerErrorException(`Client nao existe, error: ${e}`);
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
    } catch (e) {
      throw new InternalServerErrorException(
        `algum problema ocorreu durante a busca de clients, error: ${e}`,
      );
    }
  }

  async create(data: Client): Promise<Client> {
    const remapData = {
      full_name: data.full_name,
      contact: data.contact,
      address: data.address,
      isActive: data.isActive,
      creation_date: data.creation_date,
      update_date: data.update_date,
      external_user: { connect: { id: data.external_user_id } },
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
      throw new InternalServerErrorException(
        `Erro ao criar cliente, error: ${e}`,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.db.client.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `Erro ao deletar cliente, error: ${e}`,
      );
    }
  }
  async update(data: ClientRequest): Promise<Client> {
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
      throw new InternalServerErrorException(
        `Erro ao atualizar cliente, error: ${e}`,
      );
    }
  }
}
