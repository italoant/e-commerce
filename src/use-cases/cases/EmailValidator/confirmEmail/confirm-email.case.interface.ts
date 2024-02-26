import { EmailValidatorRequest } from '../../../../infrastructure/controllers/dto/email-validation.request.dto';

export interface ConfirmEmailCaseInterface {
  exec(data: EmailValidatorRequest): Promise<string>;
}
