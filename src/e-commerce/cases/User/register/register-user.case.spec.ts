import { MailerService } from '@nestjs-modules/mailer';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { User } from '../../../../domain/entities/users/user.entity';
import { CreateUserRequest } from '../../../../infrastructure/controllers/dto/create-user-request.dto';
import { UserRequest } from '../../../../infrastructure/controllers/dto/user-request.dto';
import { RegisterUser } from './register-user.case';
import { RegisterUserCaseInterface } from './register-user.case.interface';
import { Test, TestingModule } from '@nestjs/testing';

describe('', () => {
  let registerCase: RegisterUserCaseInterface;

  const UserRepositoryMock: UserInterface = {
    findOne: jest.fn(),
    findByOption: jest.fn(),
    findAll: jest.fn(),
    createUser: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    findUserToConfirmEmail: jest.fn()
  };

  let mailerService: MailerService;

  const MockMailerService = jest.fn().mockImplementation(() => ({
    sendMail: jest.fn(),
  }));

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


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: MailerService,
          useClass: MockMailerService, 
        },
      ],
    }).compile();

    mailerService = module.get<MailerService>(MailerService);
    registerCase = new RegisterUser(UserRepositoryMock, mailerService);

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
