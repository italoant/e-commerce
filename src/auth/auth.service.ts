import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequest } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private jwtService: JwtService,
  ) {}

  async signIn(data: UserRequest) {
    const user = await this.userRepository.findByOption(data);

    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (isPasswordValid) {
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        type: user.type,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new InternalServerErrorException('Erro ao fazer login');
  }
}
