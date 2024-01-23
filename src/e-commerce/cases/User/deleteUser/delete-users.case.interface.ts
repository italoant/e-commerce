import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

export interface DeleteUserCaseInterface {
  exec(data: UserRequestDto): Promise<void | string>;
}
