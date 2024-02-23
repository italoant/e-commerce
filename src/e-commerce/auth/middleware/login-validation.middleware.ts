import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { NextFunction, Request, Response } from 'express';
  import { validate } from 'class-validator';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';

  
  @Injectable()
  export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
  
      const loginRequestBody = new UserRequest();
      loginRequestBody.name = body.name;
      loginRequestBody.email = body.email;
      loginRequestBody.type = body.type;
      loginRequestBody.password = body.password;
  
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