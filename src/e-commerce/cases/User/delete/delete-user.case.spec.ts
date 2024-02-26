import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { UserInterface } from '../../../../common/service-interfaces/user.service.interface';

import { ClientRequest } from '../../../../infrastructure/controllers/dto/client.request.dto';
import { ClientType } from '../../../../domain/entities/users/user-enum';
import { DeleteClient } from '../../Client/delete/delete-client.case';
import { ClientInterface } from '../../../../common/service-interfaces/client.repository.interface';
import { User } from '../../../../domain/entities/users/user.entity';

describe('DeleteClient', () => {
  let deleteClient: DeleteClient;
  let clientRepository: ClientInterface;
  let userRepository: UserInterface;

  const user = {
    id: '1',
    name: 'name',
    email: 'email@',
    password: '12345',
    creation_date: new Date(),
    updated_date: new Date(),
    type: ClientType.ADMIN,
    isValidEmail: true,
    code: '12345',
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteClient,
        {
          provide: 'ClientInterface',
          useValue: {
            deleteClient: jest.fn(),
            findOneByExternalUserId: jest.fn(),
          },
        },
        {
          provide: 'UserInterface',
          useValue: {
            findByOption: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteClient = module.get<DeleteClient>(DeleteClient);
    clientRepository = module.get<ClientInterface>('ClientInterface');
    userRepository = module.get<UserInterface>('UserInterface');
  });

  describe('exec', () => {
    it('should delete the client if the user is an admin', async () => {
      const data: ClientRequest = {
        id: '1',
        external_user_id: '1',
        contact: 0,
        address: '1234',
        isActive: true,
        creation_date: new Date(),
        update_date: new Date()
      };

      await deleteClient.exec(user, data.id);

      expect(clientRepository.deleteClient).toHaveBeenCalledWith(data.id);
    });

    it('should delete the client if the user is the owner', async () => {
      const user = new User();

      const userClient = {
        id: '1',
        name: 'name',
        email: 'email@',
        password: '12345',
        creation_date: new Date(),
        updated_date: new Date(),
        type: ClientType.CLIENTE,
        isValidEmail: true,
        code: '12345',
      } as User;

      const data: ClientRequest = {
        id: 'id',
        external_user_id: '',
        contact: 0,
        address: '',
        isActive: false,
        creation_date: undefined,
        update_date: undefined
      };

      const userMock = { id: 'userId' };
      jest.spyOn(userRepository, 'findByOption').mockResolvedValue(user);

      const clientMock = { id: 'someClientId' };

      jest.spyOn(clientRepository, 'findOneByExternalUserId').mockResolvedValue(clientMock);


      jest.spyOn(clientRepository, 'findOneByExternalUserId').mockResolvedValue(clientMock.id)

      await deleteClient.exec(user, data.id);

      expect(clientRepository.deleteClient).toHaveBeenCalledWith(data.id);
    });

    it('should throw an exception if the user is not authorized', async () => {
      const user = new User();
      user.type = ClientType.CLIENT;

      const data: ClientRequest = { id: 'someClientId' };

      const userMock = { id: 'userId' };
      userRepository.findByOption.mockResolvedValue(userMock);

      const clientMock = { id: 'otherClientId' };
      clientRepository.findOneByExternalUserId.mockResolvedValue(clientMock);

      await expect(deleteClient.exec(user, data)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
