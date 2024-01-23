import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { GetUserCaseInterface } from './login.case.interface';
import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
@Injectable()
export class GetUser implements GetUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: UserRequestDto): Promise<User> {
    try {
      const user = await this.userRepository.findByOption(data);

      if (user) {
        return user;
      }
      console.log('invalid crendentials');
    } catch (e) {
      return e;
    }
  }
}
