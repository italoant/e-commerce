import { CreateLoginDto } from 'src/e-commerce/infrastructure/login/dto/create-login.dto';
import { UpdateLoginDto } from 'src/e-commerce/infrastructure/login/dto/update-login.dto';

export interface UserInterface {
  findOne(login: string, email: string, password: string): Promise<any>;
  findAll(): Promise<any>;
  createUser(data: CreateLoginDto): Promise<void>;
  deleteUser(id: string): Promise<void>;
  updateUser(id: string, updateLoginDto: UpdateLoginDto): Promise<void>;
}
