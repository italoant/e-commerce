import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CacheService } from './cache/cache.service';
import { UserInterface } from '../../domain/repositories-interfaces/user.service.interface';
import { UserRequest } from '../../infrastructure/controllers/dto/user.request.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private jwtService: JwtService,
    private redisCache: CacheService,
  ) {}

  async signIn(data: UserRequest) {
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
      type: data.type,
    } as User;

    const user = await this.userRepository.findByOption(newData);

    if (!user) {
      throw new UnauthorizedException('Usuario, email, ou senha incorretos');
    }

    if (user.isValidEmail === false) {
      throw new UnauthorizedException(
        'email nao validado, por favor verifique sua caixa de email e insira o codigo no link anexado',
      );
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (isPasswordValid) {
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type,
      };

      const token = { access_token: await this.jwtService.signAsync(payload) };

      await this.redisCache.storeData(token.access_token);

      return token;
    }
    throw new InternalServerErrorException(
      'Senha invalida, por favor verique e tente novamente',
    );
  }
}
