import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { PaymentRequest } from '../../../infrastructure/controllers/dto/payment-request.dto';

@Injectable()
export class AuthorizerPaymentMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authorizerBody = new PaymentRequest();
    authorizerBody.name = body.name;
    authorizerBody.quantity = body.quantity;
    authorizerBody.paymentMethod = body.paymentMethod;

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
