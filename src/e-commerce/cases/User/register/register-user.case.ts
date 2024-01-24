import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserCaseInterface } from './register-user.case.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserRequest } from 'src/e-commerce/infrastructure/controllers/dto/create-user-request.dto';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class RegisterUser implements RegisterUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: CreateUserRequest): Promise<User> {
    try {
      const userAlreadyExists = await this.userRepository.findByOption(data);
      if (!userAlreadyExists) {
        const encryptData: Prisma.UserCreateInput = {
          ...data,
          password: await bcrypt.hash(data.password, 10),
        };

        return await this.userRepository.createUser(encryptData);
      }
      console.log('user already exists');
    } catch (e) {
      return e;
    }
  }
}
