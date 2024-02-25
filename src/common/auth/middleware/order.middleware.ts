import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { OrderRequest } from '../../../infrastructure/controllers/dto/Order.request.dto';

@Injectable()
export class OrderMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authorizerBody = new OrderRequest();
    authorizerBody.external_client_id = body.external_client_id;
    authorizerBody.order_status = body.order_status;
    authorizerBody.payment_status = body.payment_status;
    authorizerBody.total_order = body.total_order;

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
