import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { CacheService } from './cache/cache.service';
import { UserInterface } from '../../common/service-interfaces/user.service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private jwtService: JwtService,
    private redisCache: CacheService,
  ) {}

  async signIn(data: UserRequest) {
    const user = await this.userRepository.findByOption(data);

    if (!user) {
      throw new UnauthorizedException();
    }

    if(user.isValidEmail === false) {
      throw new UnauthorizedException('email nao validado');
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (isPasswordValid) {
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type,
      };

      const token = {access_token: await this.jwtService.signAsync(payload),}

      await this.redisCache.storeData(token.access_token)

      return token;
    }
    throw new InternalServerErrorException('Erro ao fazer login');
  }
}
