import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // пример базового мидлвэр
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request... middleware');
    next(); // идем дальше либо к контроллеру либо к следующему middleware
  }
}
