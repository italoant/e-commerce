import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { OrderItemRequest } from '../../../infrastructure/controllers/dto/order-item.request.dto';

@Injectable()
export class OrderItemMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authorizerBody = new OrderItemRequest();
    authorizerBody.external_order = body.external_order;
    authorizerBody.external_product = body.external_product;
    authorizerBody.quantity = body.quantity;
    authorizerBody.subtotal = body.subtotal;
    authorizerBody.unitary_price = body.unitary_price;

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
