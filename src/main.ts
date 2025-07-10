import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // запуск нашего основного приложения
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('restapi');
  await app.listen(4200);
  console.log('HTTP app is listening on port 4200');

  const microserviceApp = // запуск нашего микросервиса
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      // тут мы еще активируем микросервис
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8877,
      },
    });

  await microserviceApp.listen();
  console.log('Microservices is listening on port 8877');
}
bootstrap();
