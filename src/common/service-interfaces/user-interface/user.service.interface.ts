import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { CreateUserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/create-user-request.dto';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface UserInterface {
  findOne(data: UserRequestDto): Promise<User>;
  findOneForUpdate(data: UserRequestDto): Promise<string>;
  findAll(): Promise<User[]>;
  createUser(data: CreateUserRequestDto): Promise<User>;
  deleteUser(data: UserRequestDto): Promise<void>;
  updateUser(id, updateUserDto: UserRequestDto): Promise<User>;
}
