import { Prisma } from '@prisma/client';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface UserInterface {
  findOne(data: UserRequest): Promise<User>;
  findByOption(data: UserRequest): Promise<User>;
  findAll(): Promise<User[]>;
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUser(data: Prisma.UserCreateInput): Promise<User>;
}
