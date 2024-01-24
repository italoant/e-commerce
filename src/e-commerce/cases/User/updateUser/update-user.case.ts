import { Inject, Injectable } from '@nestjs/common';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';
import { UpdateUserCaseInterface } from './update-user.case.interface';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { ClientType } from '../../../domain/entities/users/user-enum';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateUser implements UpdateUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec({ type }: User, data: UserRequest): Promise<User> {
    if (type === ClientType.ADMIN) {
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
  }
}
