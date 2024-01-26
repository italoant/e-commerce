import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { ClientInterface } from 'src/common/service-interfaces/client-interface/client.repository.interface';
import { UserInterface } from '../../../../common/service-interfaces/user-interface/user.service.interface';
import { User } from '../../../domain/entities/users/user.entity';
import { ClientRequest } from '../../../infrastructure/controllers/dto/client.request.dto';
import { ClientType } from '../../../domain/entities/users/user-enum';
import { DeleteClient } from '../../Client/deleteClient/delete-client.case';

describe('DeleteClient', () => {
  let deleteClient: DeleteClient;
  let clientRepository: ClientInterface;
  let userRepository: UserInterface;

  const user = ;

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
      user.type = ClientType.ADMIN;

      const data: ClientRequest = { id: 'id' };

      await deleteClient.exec(user, data);

      expect(clientRepository.deleteClient).toHaveBeenCalledWith(data.id);
    });

    it('should delete the client if the user is the owner', async () => {
      const user = new User();
      user.type = ClientType.CLIENT;

      const data: ClientRequest = { id: 'id' };

      const userMock = { id: 'userId' };
      userRepository.findByOption.mockResolvedValue(userMock);

      const clientMock = { id: 'someClientId' };
      clientRepository.findOneByExternalUserId.mockResolvedValue(clientMock);

      await deleteClient.exec(user, data);

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
