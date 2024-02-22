
import { ConfirmEmailRequest } from '../../../infrastructure/controllers/dto/confirm-email.request.dto';

export interface ConfirmEmailCaseInterface {
  exec(data: ConfirmEmailRequest): Promise<string>;
}
