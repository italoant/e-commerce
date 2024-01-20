import { Module } from '@nestjs/common';
import { UserService } from './login.service';
import { UserController } from './login.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'UserInterface',
      useClass: UserService,
    },
    UserService,
    PrismaService,
  ],
  exports: [
    {
      provide: 'UserInterface',
      useClass: UserService,
    },
  ],
})
export class LoginModule {}
