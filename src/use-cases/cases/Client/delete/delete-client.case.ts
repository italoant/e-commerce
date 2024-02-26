import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { DeleteClientInterface } from './delete-client.case.interface';
import { User } from '../../../../domain/entities/user.entity';
import { ClientType } from '../../../../domain/entities/enums/user-enum';
import { ClientInterface } from '../../../../domain/repositories-interfaces/client.repository.interface';
import { GetClientByUserInterface } from '../getByUser/get-client-by-user.interfae.case';

@Injectable()
export class DeleteClient implements DeleteClientInterface {
  constructor(
    @Inject('ClientInterface')
    private readonly clientRepository: ClientInterface,
    @Inject('GetClientByUserInterface')
    private readonly getClientByUser: GetClientByUserInterface,
  ) {}
  async exec(@CurrentUser() user: User, id: string): Promise<void> {
    if (user.type === ClientType.ADMIN) {
      return await this.clientRepository.delete(id);
    }

    const client = await this.getClientByUser.exec(user);

    if (client.id === id) {
      return await this.clientRepository.delete(id);
    }
    throw new InternalServerErrorException(
      'usuario do tipo cliente nao pode excluir outros clients',
    );
  }
}
