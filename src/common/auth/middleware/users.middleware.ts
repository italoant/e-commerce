import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { UserRequest } from '../../../infrastructure/controllers/dto/user.request.dto';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authorizerBody = new UserRequest();
    authorizerBody.name = body.name;
    authorizerBody.email = body.email;
    authorizerBody.password = body.password;
    authorizerBody.type = body.type;

    const validations = await validate(authorizerBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc, curr) => {
          return [...acc, ...Object.values(curr.constraints)];
        }, []),
      );
    }

    next();
  }
}
