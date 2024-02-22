import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface ConfirmEmailCaseInterface {
  exec(data: UserRequest): Promise<string>;
}
