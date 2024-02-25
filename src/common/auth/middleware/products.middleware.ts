import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { ProductRequest } from '../../../infrastructure/controllers/dto/create-product.request.dto';

@Injectable()
export class ProductsMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const authorizerBody = new ProductRequest();
    authorizerBody.product_name = body.product_name;
    authorizerBody.description = body.description;
    authorizerBody.price = body.price;
    authorizerBody.stock_quantity = body.stock_quantity;

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
