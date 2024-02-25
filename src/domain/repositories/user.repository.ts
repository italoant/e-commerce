import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserInterface } from '../repositories-interfaces/user.service.interface';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';
import { UserRequest } from '../../infrastructure/controllers/dto/user.request.dto';

@Injectable()
export class UserRepository implements UserInterface {
  constructor(private readonly db: PrismaService) {}
  async findById(id: string): Promise<User> {
    try {
      const user = await this.db.user.findFirst({
        where: {
          id: id,
        },
      });

      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          creation_date: user.creation_date,
          update_date: user.update_date,
          type: user.type,
        } as User;
      }
    } catch (e) {
      throw new InternalServerErrorException(
        `Houve um erro durante a busca do usuario, por favor tente novamente, error: ${e}`,
      );
    }
  }

  async findUserToConfirmEmail(user: User): Promise<string> {
    const { id } = user;

    const remapData = {
      isValidEmail: true,
      update_date: new Date(),
    };

    try {
      await this.db.user.update({
        data: remapData,
        where: {
          id,
        },
      });

      return 'email validado com sucesso';
    } catch (e) {
      return 'codigo invalido';
    }
  }

  async findByOption(data: User): Promise<User> {
    try {
      const user = await this.db.user.findFirst({
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
          update_date: user.update_date,
          type: user.type,
          isValidEmail: user.isValidEmail,
        } as User;
      }
    } catch (e) {
      throw new InternalServerErrorException(
        `Houve um erro durante a busca do usuario, por favor tente novamente, error: ${e}`,
      );
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
          update_date: user.update_date,
          type: user.type,
        } as User);
      }
      return usersList;
    } catch (e) {
      throw new InternalServerErrorException(
        `Houve um erro durante a busca de usuarios, por favor tente novamente, error: ${e}`,
      );
    }
  }

  async create(data: User): Promise<User> {
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
        update_date: user.update_date,
        type: user.type,
      } as User;
    } catch (e) {
      throw new InternalServerErrorException(
        `Houve um erro durante a criacao do usuario, por favor tente novamente, error: ${e}`,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.db.user.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(
        `Houve um erro ao tentar deletar o usuario, por favor tente novamente, error: ${e}`,
      );
    }
  }
  async update(data: Prisma.UserCreateInput): Promise<User> {
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
          update_date: updateUser.update_date,
          type: updateUser.type,
        } as User;
      }
    } catch (e) {
      throw new InternalServerErrorException(
        `Houve um erro ao tentar atualizar o usuario, por favor tente novamente, error: ${e}`,
      );
    }
  }
}
