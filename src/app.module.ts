import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './e-commerce/infrastructure/infra.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { GetUser } from './e-commerce/cases/User/getUser/get-user.case.';
import { GlobalExceptionFilter } from './common/globalErrors/global-error';

@Module({
  imports: [InfraModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    GetUser,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
