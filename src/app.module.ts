import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './e-commerce/infrastructure/infra.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { GetUser } from './e-commerce/cases/User/get/get-user.case.';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
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
