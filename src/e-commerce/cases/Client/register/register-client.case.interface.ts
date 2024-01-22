import { Client } from 'src/e-commerce/domain/entities/client/client.entity';
import { ClientRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/client.request.dto';

export interface RegisterClientCaseInterface {
  exec(data: ClientRequestDto): Promise<Client>;
}
