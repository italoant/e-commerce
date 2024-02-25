import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { ClientRequest } from '../../../infrastructure/controllers/dto/client.request.dto';

@Injectable()
export class ClientMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authorizerBody = new ClientRequest();
    authorizerBody.external_user_id = body.eexternal_user_idx;
    authorizerBody.full_name = body.full_name;
    authorizerBody.contact = body.contact;
    authorizerBody.address = body.address;

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
