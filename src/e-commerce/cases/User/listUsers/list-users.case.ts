import { Inject } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { ListUseCaseInterface } from './list-users.case.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';

export class ListUsers implements ListUseCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();

      if (users) {
        return users;
      }
    } catch (e) {
      return e;
    }
  }
}
