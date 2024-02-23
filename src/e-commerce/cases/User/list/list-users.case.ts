import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ListUseCaseInterface } from './list-users.case.interface';
import { User } from 'src/domain/entities/users/user.entity';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';

export class ListUsers implements ListUseCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(req: User): Promise<User[]> {
    if (req.type === ClientType.ADMIN) {
      try {
        const users = await this.userRepository.findAll();

        if (!users) {
          throw new NotFoundException();
        }

        return users;
      } catch (error) {
        throw new InternalServerErrorException('Erro ao buscar usuario');
      }
    }
    throw new NotFoundException();
  }
}
