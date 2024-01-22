import { Inject } from '@nestjs/common';
import { DeleteUserCaseInterface } from './delete-users.case.interface';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export class DeleteUser implements DeleteUserCaseInterface {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(data: UserRequestDto): Promise<void> {
    await this.userRepository.deleteUser(data);
    return;
  }
}
