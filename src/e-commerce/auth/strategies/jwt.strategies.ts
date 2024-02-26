import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRequest } from '../../../infrastructure/controllers/dto/user-request.dto';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: UserRequest): Promise<User> {
    return {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      type: payload.type,
    } as User;
  }
}
