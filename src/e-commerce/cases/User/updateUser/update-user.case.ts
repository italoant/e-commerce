import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { UpdateUserCaseInterface } from './update-user.case.interface';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

@Injectable()
export class UpdateUser implements UpdateUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: UserRequestDto): Promise<User> {
    const user = await this.userRepository.findOne(data);

    if (user) {
      return await this.userRepository.updateUser(
        data.id,
        data,
        user.creationDate,
      );
    }
  }
}
