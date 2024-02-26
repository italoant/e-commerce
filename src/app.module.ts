import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCaseModule } from './use-cases/usecase.module';
import { APP_GUARD } from '@nestjs/core';
import { GetUser } from './use-cases/cases/User/get/get-user.case.';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './common/auth/auth.guard';
import { AuthModule } from './common/auth/auth.module';
import { InfraModule } from './infrastructure/infra.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    UseCaseModule,
    DomainModule,
    InfraModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILIGUN_HOST,
        secure: false,
        port: Number(process.env.MAILIGUN_PORT),
        auth: {
          user: process.env.MAILIGUN_USER,
          pass: process.env.MAILIGUN_PASS,
        },
        ignoreTLS: true,
      },
    }),
    InfraModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GetUser,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
