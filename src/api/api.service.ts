import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ApiCreatedDto } from './api.dto';
import { ConfigService } from '@nestjs/config';
import { EnumAppMode } from 'src/types';

@Injectable()
export class ApiService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {} // сначала в apimodule в  provider записали теперь здесь принимаем через конструктор его и вывожим далее
  findAll() {
    console.log(this.configService.get<EnumAppMode>('MODE')); // в консоле будет значение нашей переменной development
    return this.prisma.flower.findMany(); // обращаемся уже к нашей модели в prisma
    // return [
    //   {
    //     name: 'Rose',
    //     color: 'Red',
    //     price: 4,
    //   },
    //   {
    //     name: 'Lily',
    //     color: 'White',
    //     price: 6,
    //   },
    //   {
    //     name: 'Tulip',
    //     color: 'Yellow',
    //     price: 3,
    //   },
    // ];
  }

  create(dto: ApiCreatedDto) {
    // dto
    return this.prisma.flower.create({
      data: dto,
    });
  }
}
