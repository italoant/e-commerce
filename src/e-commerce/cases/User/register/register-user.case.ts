import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserCaseInterface } from './register-user.case.interface';
import { CreateUserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/create-user-request.dto';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';

@Injectable()
export class RegisterUser implements RegisterUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: CreateUserRequestDto): Promise<User> {
    try {
      const userAlreadyExists = await this.userRepository.findOne(data);
      if (!userAlreadyExists) {
        return await this.userRepository.createUser(data);
      }
      console.log('user already exists');
    } catch (e) {
      return e;
    }
  }
}
