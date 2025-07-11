import { Test } from '@nestjs/testing';
import { ApiService } from './api.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    // создаем моковский контроллер
    const module = await Test.createTestingModule({
      providers: [
        ApiService,
        {
          provide: PrismaService,
          useValue: {
            flower: {
              findMany: jest.fn().mockResolvedValue([
                // в prisma функция называется findMany а не findAll
                // jest работает у nest из-под коробки
                {
                  id: 1,
                  name: 'Rose',
                  color: 'Red',
                  price: 10,
                },
              ]),
              create: jest.fn().mockResolvedValue(
                // jest работает у nest из-под коробки
                {
                  id: 2,
                  name: 'Lily',
                  color: 'White',
                  price: 15,
                },
              ),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ApiService>('ApiService'); // берём уже не модуль, а сервис , получаем сервис и указываем ему тип
  });

  it('should return an array of flowers', async () => {
    expect(await service.findAll()).toEqual([
      // тут мы пишем, что мы ожидаем
      {
        id: 1,
        name: 'Rose',
        color: 'Red',
        price: 10,
        // createdAt: Date,
        // updatedAt: Date
      },
    ]);
  });

  it('should return an array of flowers', async () => {
    expect(
      await service.create({
        name: 'Lily',
        color: 'White',
        price: 15,
        // createdAt: Date,
        // updatedAt: Date
      }),
    ).toEqual({
      id: 2,
      name: 'Lily',
      color: 'White',
      price: 15,
      // createdAt: Date,
      // updatedAt: Date

      // тут мы пишем, что мы ожидаем
    });
  });
});
