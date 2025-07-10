import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable() // преобразование данных
export class ParseIntPipe implements PipeTransform<string, number> {
  // parseInt в JavaScript — это функция, которая парсит строку и возвращает целое число
  transform(value: string): number {
    console.log('pipe');
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
