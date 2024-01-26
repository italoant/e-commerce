import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRequest } from '../../e-commerce/infrastructure/controllers/dto/user-request.dto';
import { User } from '../../e-commerce/domain/entities/users/user.entity';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
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
