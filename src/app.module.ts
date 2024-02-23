import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './infrastructure/infra.module';
import { APP_GUARD } from '@nestjs/core';
import { GetUser } from './e-commerce/cases/User/get/get-user.case.';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './e-commerce/auth/auth.guard';
import { AuthModule } from './e-commerce/auth/auth.module';


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
