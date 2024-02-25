import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UpdateUserCaseInterface } from './update-user.case.interface';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { UpdateUserRequest } from '../../../../infrastructure/controllers/dto/update-user.request.dto';

@Injectable()
export class UpdateUser implements UpdateUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(user: User, data: UpdateUserRequest): Promise<User> {
    const userInfo = await this.userRepository.findByOption(data);

    if (userInfo) {
      const newData: Prisma.UserCreateInput = {
        ...data,
        password: await bcrypt.hash(data.password, 10),
        creation_date: userInfo.creation_date,
        code: userInfo.code,
      };

      if (user.type === ClientType.ADMIN) {
        return await this.userRepository.update(newData);
      }

      if (user.type === ClientType.CLIENTE && userInfo.id === data.id) {
        return await this.userRepository.update(newData);
      }

      if (user.type === ClientType.CLIENTE && userInfo.id !== data.id) {
        throw new NotFoundException('voce so pode alterar seu propio usuario');
      }
    }
    throw new NotFoundException('Usuario nao encontrado');
  }
}
