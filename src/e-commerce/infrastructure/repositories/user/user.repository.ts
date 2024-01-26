import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequest } from '../../controllers/dto/user-request.dto';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { PrismaService } from '../../../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data: UserRequest): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: data.id,
        },
      });

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          creation_date: user.creation_date,
          updated_date: user.update_date,
          type: user.type,
        } as User;
      }
      return;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findByOption(data: UserRequest): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name: data.name,
          email: data.email,
          type: data.type,
        },
      });

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          creation_date: user.creation_date,
          updated_date: user.update_date,
          type: user.type,
        } as User;
      }
      return;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    const usersList = [];
    try {
      const users = await this.prisma.user.findMany();
      for (const user of users) {
        usersList.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          creation_date: user.creation_date,
          updated_date: user.update_date,
          type: user.type,
        } as User);
      }
      return usersList;
    } catch (error) {
      return error;
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    data.creation_date = new Date();
    data.update_date = new Date();

    try {
      const user = await this.prisma.user.create({
        data,
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        creation_date: user.creation_date,
        updated_date: user.update_date,
        type: user.type,
      } as User;
    } catch (e) {
      return e;
    }
  }
  async deleteUser(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      return e;
    }
  }
  async updateUser(data: Prisma.UserCreateInput): Promise<User> {
    const remapData = {
      id: data.id,
      name: data.name,
      email: data.email,
      creation_date: data.creation_date,
      update_date: new Date(),
      type: data.type,
    };

    const { id } = data;
    try {
      const updateUser = await this.prisma.user.update({
        data: remapData,
        where: {
          id,
        },
      });
      if (updateUser) {
        return {
          id: updateUser.id,
          name: updateUser.name,
          email: updateUser.email,
          password: updateUser.password,
          creation_date: updateUser.creation_date,
          updated_date: updateUser.update_date,
          type: updateUser.type,
        } as User;
      }
    } catch (e) {
      return e;
    }
  }
}
