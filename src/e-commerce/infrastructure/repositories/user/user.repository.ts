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
          name: data.name,
          password: data.password,
          email: data.email,
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
    } catch (e) {
      return e;
    }
  }

  async findOneForUpdate(data: UserRequestDto): Promise<string> {
    const { id } = await this.prisma.user.findFirst({
      where: {
        name: data.name,
        password: data.password,
        email: data.email,
      },
    });

    return id;
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
  async deleteUser(data: UserRequestDto): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: {
          name: data.name,
          password: data.password,
          email: data.email,
        },
      });
      return;
    } catch (e) {
      return e;
    }
  }
  async updateUser(id, data: UserRequestDto): Promise<User> {
    try {
      const updateUser = await this.prisma.user.update({
        data,
        where: {
          id,
        },
      });

      return {
        id: updateUser.id,
        name: updateUser.name,
        email: updateUser.email,
        password: updateUser.password,
        creationDate: updateUser.creatdAt,
        updatedDate: updateUser.updatedAt,
        type: updateUser.type,
      } as User;
    } catch (e) {
      return e;
    }
  }
}
