import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { ParseIntPipe } from '../conception/pipe';
import { AuthGuard } from '../conception/guard';
import { LoggingInterceptor } from '../conception/interceptor';
import { ApiCreatedDto } from './api.dto';

@Controller('api') // наш путь
@UseInterceptors(LoggingInterceptor) // использование интерсепторов
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  @UseGuards(AuthGuard) // использование Guards. В NestJS декоратор @UseGuards(...) предназначен для подключения гвардов (Guards) — классов
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    // использование pipe
    console.log(pageNumber);
    return this.apiService.findAll(); //localhost:4200/restapi/api выведет обьект всех цветов
  }

  @Post() // второй наш метод на добавление данных
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: ApiCreatedDto) {
    return this.apiService.create(dto);
  }
}
// http://localhost:3200/restapi/api?pageNumber=2
// возвратится 2 как число
