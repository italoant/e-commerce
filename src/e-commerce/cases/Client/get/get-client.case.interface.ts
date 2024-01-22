import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface GetClientInterface {
  exec(data: UserRequestDto): Promise<Client>;
}
