import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterface } from 'src/common/service-interfaces/user-interface/user.service.interface';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserInterface')
    private readonly userRepository: UserInterface,
    private jwtService: JwtService,
  ) {}

  async signIn(data: UserRequestDto) {
    const user = await this.userRepository.findOne(data);
    if (user.password !== data.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
      password: user.password,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
