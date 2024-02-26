import { CreateUserRequest } from "../../../../infrastructure/controllers/dto/create-user-request.dto";

export interface ConfirmEmailCaseInterface {
  exec(data: CreateUserRequest): Promise<string>;
}
