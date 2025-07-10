import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  sendMessage(): string {
    this.appService.sendMessage();
    return 'Message sent';
  }
}
