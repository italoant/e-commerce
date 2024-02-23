import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/users/user.entity';
import { DbService } from '../../../db.service';
import { Prisma } from '@prisma/client';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';
import { UserInterface } from '../../../common/service-interfaces/user.service.interface';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(private readonly db: DbService) {}
  async findOne(data: UserRequest): Promise<User> {
    try {
      const user = await this.db.user.findFirst({
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
      
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async findUserToConfirmEmail(user: UserRequest): Promise<string> {
    const { id } = user;

    const remapData = {
      isValidEmail: true,
      update_date: new Date(),
    };


    try {
      const updateUser = await this.db.user.update({
        data: remapData,
        where: {
          id
        }
      })

      return 'email validado com sucesso'
    } catch(e){
      return 'codigo invalido'
    }
  }

  async findByOption(data: UserRequest): Promise<User> {
    try {
      const user = await this.db.user.findFirst({
        where: {
          name: data.name,
          email: data.email,
          type: data.type,
          code: data.code,
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
          isValidEmail: user.isValidEmail,
        } as User;
      }
      
    } catch (e) {
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    const usersList = [];
    try {
      const users = await this.db.user.findMany();
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
      const user = await this.db.user.create({
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
      await this.db.user.delete({
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
      const updateUser = await this.db.user.update({
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
