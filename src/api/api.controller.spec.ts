import { Test } from '@nestjs/testing'; // тестирование нашего контроллера
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    // создаем моковский контроллер
    const module = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        {
          provide: ApiService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
      ],
    }).compile();

    controller = module.get<ApiController>('ApiController'); // берём модуль, получаем контроллер и указываем ему тип
  });

  it('should return an array of flowers', async () => {
    expect(await controller.findAll(1)).toEqual([
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

  it('should create and return a flower', async () => {
    const flowerData = {
      name: 'Lily',
      color: 'White',
      price: 15,
    };

    expect(await controller.create(flowerData)).toEqual({
      // тут мы пишем, что мы ожидаем
      id: 2,
      name: 'Lily',
      color: 'White',
      price: 15,
    });
  });
});
