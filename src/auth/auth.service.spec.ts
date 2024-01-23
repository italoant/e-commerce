import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRequestDto } from 'src/e-commerce/infrastructure/controllers/dto/user-request.dto';
import { User } from 'src/e-commerce/domain/entities/users/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  enum ClientTypeMock {
    ADMIN = 'AD',
    CLIENTE = 'CL',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UserInterface',
          useValue: {
            findOne: jest.fn(),
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
      const userRequestDto: UserRequestDto = {
        id: 'id',
        name: 'user',
        email: 'user@email.com',
        token: 'token',
        password: '12345',
      };

      const mockUser = {
        id: 'id',
        name: 'user',
        email: 'string',
        password: 'user@email.com',
        access_token: 'token',
        creationDate: new Date(),
        updatedDate: new Date(),
        type: ClientTypeMock,
      } as unknown as User;

      jest
        .spyOn(authService['userRepository'], 'findOne')
        .mockResolvedValue(mockUser);

      const result = await authService.signIn(userRequestDto);

      expect(result.access_token).toBeDefined();
    });

    it('should throw UnauthorizedException on incorrect password', async () => {
      const userRequestDto = {
        id: 'id',
        name: 'user',
        email: 'user@email.com',
        token: 'token',
        password: '12345',
      };

      const mockUser = {
        id: 'id',
        name: 'user',
        email: 'string',
        password: 'user@email.com',
        access_token: 'token',
        creationDate: new Date(),
        updatedDate: new Date(),
        type: ClientTypeMock,
      } as unknown as User;

      jest
        .spyOn(authService['userRepository'], 'findOne')
        .mockResolvedValue(mockUser);

      userRequestDto.password = '11222';

      await expect(authService.signIn(userRequestDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
