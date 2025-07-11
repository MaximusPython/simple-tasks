import { INestApplication, ValidationPipe } from '@nestjs/common'; // e2e тест
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { response } from 'express';

describe('ApiController (e2e)', () => {
  let app: INestApplication; // тестируем уже все наше приложение

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleMixture.createNestApplication(); // к app привязываем наше моковское приложение
    app.useGlobalPipes(new ValidationPipe()); // проверяем наши pipe
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200) // ожидаем 200 статус и данные ниже
      .expect([
        {
          id: 1,
          name: 'Rose',
          color: 'Red',
          price: 5,
          createdAt: '2025-07-10T15:00:44.109Z',
          updatedAt: '2025-07-10T15:00:44.109Z',
        },
        {
          id: 2,
          name: 'Lily',
          color: 'White',
          price: 10,
          createdAt: '2025-07-10T15:05:50.239Z',
          updatedAt: '2025-07-10T15:05:50.239Z',
        },
        {
          id: 3,
          name: 'Tulip',
          color: 'Yellow',
          price: 3,
          createdAt: '2025-07-10T15:05:56.479Z',
          updatedAt: '2025-07-10T15:05:56.479Z',
        },
        {
          id: 4,
          name: 'Tulip',
          color: 'Yellow',
          price: 3,
          createdAt: '2025-07-10T15:26:25.147Z',
          updatedAt: '2025-07-10T15:26:25.147Z',
        },
        {
          id: 5,
          name: 'Tulip',
          color: 'Yellow',
          price: 3,
          createdAt: '2025-07-10T15:27:00.040Z',
          updatedAt: '2025-07-10T15:27:00.040Z',
        },
      ]);
  });

  it('/api (POST)', () => {
    return request(app.getHttpServer())
      .post('/api')
      .send({
        name: 'SunFlower',
        color: 'Yellow',
        price: 8,
      })
      .expect(201)
      .expect((response) => {
        console.log(response.body);
        return response.body.name === 'SunFlower';
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
