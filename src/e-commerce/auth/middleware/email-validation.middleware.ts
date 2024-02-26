import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { NextFunction, Request, Response } from 'express';
  import { validate } from 'class-validator';
import { CreateUserRequest } from '../../../infrastructure/controllers/dto/create-user-request.dto';

  
  @Injectable()
  export class EmailValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
  
      const loginRequestBody = new CreateUserRequest();
      loginRequestBody.name = body.name;
      loginRequestBody.email = body.email;
      loginRequestBody.code = body.code;
  
      const validations = await validate(loginRequestBody);

  
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