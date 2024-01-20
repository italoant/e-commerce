import { NestFactory } from '@nestjs/core';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const config = new DocumentBuilder()
  //   .setTitle('e-commerce')
  //   .setDescription('Loomi-chanllange')
  //   .setVersion('1.0')
  //   .addTag('e-commerce')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('swagger', app, document);

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
