import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../e-commerce/domain/entities/users/user.entity';
import { AuthRequest } from './authRequest.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
