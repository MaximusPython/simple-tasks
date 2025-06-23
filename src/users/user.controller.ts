import { BaseController } from '../common/base.controller.js'
import { NextFunction, Request, Response } from 'express'
import { LoggerService } from '../logger/logger.service.js'
import { HTTPError } from '../error/http-error.class.js'

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger)
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'ОШИБКА Авторизации', 'login'))
  }
  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }
}
