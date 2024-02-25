import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UpdateUserCaseInterface } from './update-user.case.interface';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { UserRequest } from '../../../../infrastructure/controllers/dto/user.request.dto';

@Injectable()
export class UpdateUser implements UpdateUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data: UserRequest): Promise<User> {
    const { id } = await this.userRepository.findByOption(user);

    if (id) {
      const newData = {
        name: data.name,
        email: data.email,
        type: data.type,
        password: await bcrypt.hash(data.password, 10),
        update_date: new Date(),
      } as User;

      if (user.type === ClientType.ADMIN) {
        return await this.userRepository.update(newData);
      }

      if (user.type === ClientType.CLIENTE && id === data.id) {
        return await this.userRepository.update(newData);
      }

      if (user.type === ClientType.CLIENTE && id !== data.id) {
        throw new NotFoundException('voce so pode alterar seu propio usuario');
      }
    }
    throw new NotFoundException('Usuario nao encontrado');
  }
}
