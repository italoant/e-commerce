import { Client } from 'src/e-commerce/domain/entities/client/client.entity';

export interface ListClientInterface {
  exec(): Promise<Client[]>;
}
