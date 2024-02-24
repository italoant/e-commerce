import { Prisma } from '@prisma/client';
import { User } from 'src/domain/entities/user.entity';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';

export interface UserInterface {
  findOne(data: UserRequest): Promise<User>;
  findUserToConfirmEmail(data: UserRequest): Promise<string>;
  findByOption(data: UserRequest): Promise<User>;
  findAll(): Promise<User[]>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUser(data: Prisma.UserCreateInput): Promise<User>;
}
