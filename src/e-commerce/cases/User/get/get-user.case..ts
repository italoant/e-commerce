import { CurrentUser } from '../../../../common/current-user-decorator/current-user.decorator';
import { User } from '../../../../domain/entities/users/user.entity';
import { GetUserCaseInterface } from './get-user.case.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GetUser implements GetUserCaseInterface {
  constructor() {}
  async exec(@CurrentUser() user: User) {
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
