import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { DeleteClientInterface } from './delete-client.case.interface';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { UserInterface } from '../../../../domain/repositories-interfaces/user.service.interface';
import { ClientInterface } from '../../../../domain/repositories-interfaces/client.repository.interface';

@Injectable()
export class DeleteClient implements DeleteClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
  ) {}
  async exec(@CurrentUser() user: User, id: string): Promise<void> {
    if (user.type === ClientType.ADMIN) {
      return await this.clientRepository.delete(id);
    }

    const userResponse = await this.userRepository.findByOption(user);

    const client = await this.clientRepository.findOneByExternalUserId(
      userResponse.id,
    );
    if (client.id === id) {
      return await this.clientRepository.delete(id);
    }
    throw new InternalServerErrorException(
      'usuario do tipo cliente nao pode excluir outros clients',
    );
  }
}
