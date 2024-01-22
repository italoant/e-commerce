import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { PrismaService } from 'src/prisma.service';
import { ClientRequestDto } from '../../controllers/dto/client.request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRepository implements ClientInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOneById(id: string): Promise<Client> {
    const client = await this.prisma.client.findFirst({
      where: {
        external_user_id: id,
      },
    });

    return {
      id: client.id,
      userId: client.external_user_id,
      username: client.userFullName,
      userContact: client.contact,
      userAdress: client.adress,
      status: client.status,
      creationDate: client.creatdAt,
      updatedDate: client.updatedAt,
    } as Client;
  }

  async findOneByOptions(data: ClientRequestDto): Promise<Client> {
    try {
      const client = await this.prisma.client.findFirst({
        where: {
          userFullName: data.userFullName,
          contact: data.contact,
          adress: data.adress,
          status: data.status,
        },
      });

      if (client) {
        return {
          id: client.id,
          userId: client.external_user_id,
          username: client.userFullName,
          userContact: client.contact,
          userAdress: client.adress,
          status: client.status,
          creationDate: client.creatdAt,
          updatedDate: client.updatedAt,
        } as Client;
      }
      return;
    } catch (e) {
      return e;
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clientList = [];
      const clients = await this.prisma.client.findMany();

      for (const client of clients) {
        clientList.push({
          id: client.id,
          userId: client.external_user_id,
          username: client.userFullName,
          userContact: client.contact,
          userAdress: client.adress,
          status: client.status,
          creationDate: client.creatdAt,
          updatedDate: client.updatedAt,
        } as Client);
      }
      return clientList;
    } catch (error) {
      return error;
    }
  }

  async createClient(data: ClientRequestDto, id: string): Promise<Client> {
    const remapData = {
      userFullName: data.userFullName,
      contact: data.contact,
      adress: data.adress,
      status: data.status,
      updatedAt: data.updatedAt,
      external_user: { connect: { id: id } },
    };

    try {
      const client = await this.prisma.client.create({
        data: remapData,
      });

      return {
        id: client.id,
        userId: client.external_user_id,
        username: client.userFullName,
        userContact: client.contact,
        userAdress: client.adress,
        status: client.status,
        creationDate: client.creatdAt,
        updatedDate: client.updatedAt,
      } as Client;
    } catch (e) {
      return e;
    }
  }
  async deleteClient(id: string): Promise<void> {
    try {
      await this.prisma.client.delete({
        where: {
          external_user_id: id,
        },
      });
      return;
    } catch (e) {
      return e;
    }
  }
  async updateClient(id: string, data: ClientRequestDto): Promise<Client> {
    try {
      const updateClient = await this.prisma.client.update({
        where: {
          external_user_id: id,
        },
        data: {
          userFullName: data.userFullName,
          contact: data.contact,
          adress: data.adress,
          status: data.status,
          updatedAt: new Date(),
        },
      });

      return {
        id: updateClient.id,
        userId: updateClient.external_user_id,
        username: updateClient.userFullName,
        userContact: updateClient.contact,
        userAdress: updateClient.adress,
        status: updateClient.status,
        creationDate: updateClient.creatdAt,
        updatedDate: updateClient.updatedAt,
      } as Client;
    } catch (e) {
      return e;
    }
  }
}
