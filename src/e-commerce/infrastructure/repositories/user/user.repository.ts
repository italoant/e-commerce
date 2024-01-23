import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { PrismaService } from 'src/prisma.service';
import { CreateUserRequestDto } from '../../controllers/dto/create-user-request.dto';
import { UserRequestDto } from '../../controllers/dto/user-request.dto';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(data: UserRequestDto): Promise<User> {
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
          creationDate: user.creatdAt,
          updatedDate: user.updatedAt,
          type: user.type,
        } as User;
      }
      return;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findByOption(data: UserRequestDto): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          creationDate: user.creatdAt,
          updatedDate: user.updatedAt,
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
          creationDate: user.creatdAt,
          updatedDate: user.updatedAt,
          type: user.type,
        } as User);
      }
      return usersList;
    } catch (error) {
      return error;
    }
  }

  async createUser(data: CreateUserRequestDto): Promise<User> {
    data.creatdAt = new Date();
    data.updatedAt = new Date();

    try {
      const user = await this.prisma.user.create({
        data,
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        creationDate: user.creatdAt,
        updatedDate: user.updatedAt,
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
  async updateUser(
    id: string,
    data: UserRequestDto,
    creatdAt: Date,
  ): Promise<User> {
    const remapData = {
      id: id,
      name: data.name,
      email: data.email,
      creatdAt: creatdAt,
      updatedAt: new Date(),
      type: data.type,
    };
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
          creationDate: updateUser.creatdAt,
          updatedDate: updateUser.updatedAt,
          type: updateUser.type,
        } as User;
      }
    } catch (e) {
      return e;
    }
  }
}
