import { UserInterface } from '../../../../common/service-interfaces/user-interface/user.service.interface';
import { ClientType } from '../../../domain/entities/users/user-enum';
import { User } from '../../../domain/entities/users/user.entity';
import { CreateUserRequest } from '../../../infrastructure/controllers/dto/create-user-request.dto';
import { RegisterUser } from './register-user.case';
import { RegisterUserCaseInterface } from './register-user.case.interface';

describe('', () => {
  let registerCase: RegisterUserCaseInterface;

  const UserRepositoryMock: UserInterface = {
    findOne: jest.fn(),
    findByOption: jest.fn(),
    findAll: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  };

  const userMock = {
    id: 'userId',
    name: 'username',
    email: 'user@email.com',
    password: '12345',
    creation_date: new Date(),
    updated_date: new Date(),
    type: ClientType.ADMIN,
  } as User;

  const userRequestMock = {
    id: 'userId',
    name: 'username',
    email: 'user@email.com',
    password: '12345',
    creation_date: new Date(),
    update_date: new Date(),
    type: 'ADMIN',
  } as CreateUserRequest;
  beforeEach(async () => {
    jest.resetAllMocks;

    registerCase = new RegisterUser(UserRepositoryMock);

    jest.clearAllMocks;
  });

  it('registercase class should be defined', async () => {
    expect(registerCase).toBeDefined();
  });

  it('should call all function verify if client dont exists and create user', async () => {
    jest.spyOn(UserRepositoryMock, 'findByOption').mockResolvedValue(undefined);

    jest.spyOn(UserRepositoryMock, 'createUser').mockResolvedValue(userMock);

    const response = await registerCase.exec(userRequestMock);

    expect(response).toBeDefined();
    expect(response).toEqual(userMock);
  });

  it('should call all function verify if client exists and return undefined', async () => {
    jest.spyOn(UserRepositoryMock, 'findByOption').mockResolvedValue(userMock);

    const response = await registerCase.exec(userRequestMock);

    expect(response).toBeUndefined();
  });
});
