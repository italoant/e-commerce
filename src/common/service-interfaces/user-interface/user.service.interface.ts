import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { CreateUserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/create-user-request.dto';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface UserInterface {
  findOne(data: UserRequestDto): Promise<User>;
  findByOption(data: UserRequestDto): Promise<User>;
  findAll(): Promise<User[]>;
  createUser(data: CreateUserRequestDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
  updateUser(
    id: string,
    updateUserDto: UserRequestDto,
    creatdAt: Date,
  ): Promise<User>;
}
