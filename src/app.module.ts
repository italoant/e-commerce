import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './e-commerce/infrastructure/infra.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { LoginUser } from './e-commerce/cases/User/login/login.case.';

@Module({
  imports: [InfraModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    LoginUser,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
