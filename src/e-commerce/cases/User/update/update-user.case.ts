import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { UpdateUserCaseInterface } from './update-user.case.interface';
import { ClientType } from '../../../domain/entities/users/user-enum';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';

@Injectable()
export class UpdateUser implements UpdateUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data: UserRequest): Promise<User> {
    if (user.type === ClientType.ADMIN) {
      const user = await this.userRepository.findOne(data);

      if (user) {
        const newData: Prisma.UserCreateInput = {
          ...data,
          password: await bcrypt.hash(data.password, 10),
          creation_date: user.creation_date,
        };
        return await this.userRepository.updateUser(newData);
      }
    }
    const remapUser = {
      name: user.name,
      email: user.email,
      type: user.type,
    } as UserRequest;
    const { id } = await this.userRepository.findByOption(remapUser);

    if (id === data.id) {
      return await this.userRepository.updateUser(data);
    }
    throw new NotFoundException();
  }
}
