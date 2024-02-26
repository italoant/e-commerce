import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from 'src/infrastructure/controllers/dto/user-request.dto';
import { User } from 'src/domain/entities/users/user.entity';
import { ClientType } from '../../domain/entities/users/user-enum';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserInterface',
          useValue: {
            findOne: jest.fn(),
            findByOption: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(() => 'mocked_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signIn', () => {
    it('should return an access token on successful sign in', async () => {
      const userRequestDto: UserRequest = {
        name: 'user',
        email: 'user@email.com',
        password: '12345',
        type: 'ADMIN',
        code: ''
      };

      const mockUser = {
        access_token: 'token',
      };

      jest.spyOn(authService, 'signIn').mockResolvedValue(mockUser);

      const result = await authService.signIn(userRequestDto);

      expect(result.access_token).toBeDefined();
    });

    it('should throw UnauthorizedException on incorrect password', async () => {
      const userRequest = {
        id: 'id',
        name: 'user',
        email: 'user@email.com',
        password: '12345',
      } as UserRequest;

      const mockUser = {
        name: 'user',
        email: 'email',
        password: '1234',
        creation_date: new Date(),
        updated_date: new Date(),
        type: ClientType.ADMIN,
      } as User;

      jest
        .spyOn(authService['userRepository'], 'findOne')
        .mockResolvedValue(mockUser);

      await expect(authService.signIn(userRequest)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
