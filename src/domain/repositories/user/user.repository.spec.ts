import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserRequest } from '../../controllers/dto/user-request.dto';
import { User } from 'src/domain/entities/users/user.entity';
import { DbService } from '../../../db.service';
import { ClientType } from '../../../domain/entities/users/user-enum';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  const DbService = {
    user: { findFirst: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { useValue: DbService, provide: DbService },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const mockUserRequest: UserRequest = {
        id: '1',
        name: 'user',
        email: 'email@email.com',
        password: '12345',
        type: ClientType.ADMIN,
      };

      const mockPrismaUser = {
        id: '1',
        name: 'user',
        email: 'email@email.com',
        password: '12345',
        creation_date: new Date('2022-01-01'),
        update_date: new Date('2022-01-01'),
        type: 'ADMIN',
      };

      jest
        .spyOn(DbService.user, 'findFirst')
        .mockResolvedValueOnce(mockPrismaUser);

      const result = await userRepository.findOne(mockUserRequest);

      expect(result).toStrictEqual({
        id: '1',
        name: 'user',
        email: 'email@email.com',
        password: '12345',
        creationDate: new Date('2022-01-01'),
        updatedDate: new Date('2022-01-01'),
        type: ClientType.ADMIN,
      } as User);
    });
  });
});
