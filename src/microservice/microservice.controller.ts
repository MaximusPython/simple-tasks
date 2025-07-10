import { Controller } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  @EventPattern('message') // подписка на эвенты
  handleMessage(message: string) {
    // получаем месседж
    this.microserviceService.handleMessage(message); // вызов этого
  }
}
