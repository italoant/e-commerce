import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from './e-commerce/infrastructure/infra.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { GetUser } from './e-commerce/cases/User/getUser/get-user.case.';
import { GlobalExceptionFilter } from './common/globalErrors/global-error';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    InfraModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org', //host smtp
        secure: false, //regras de segurança do serviço smtp
        port: 587, // porta
        auth: {
          //dados do usuário e senha
          user: 'postmaster@sandbox87163cc3e53740328532270194ad445a.mailgun.org',
          pass: '2f772b498233ee528392dd8978cbc316-063062da-2fe3f226',
        },
        ignoreTLS: true,
      },
      defaults: {
        // configurações que podem ser padrões
        from: '"',
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
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
