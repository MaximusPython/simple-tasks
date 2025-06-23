import { Router, Response, Request } from 'express'
import { LoggerService } from '../logger/logger.service.js'
import { IControllerRoute } from './route.interface.js'
export { Router } from 'express'

export abstract class BaseController {
  private readonly _router: Router
  constructor(private logger: LoggerService) {
    this._router = Router()
  }

  get router() {
    return this._router
  }
  public created(res: Response) {
    return res.sendStatus(201)
  }

  public send<T>(res: Response, code: number, message: T) {
    return res.status(code).json(message)
  } // таких методов можно сделать несколько

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message)
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`) // вывод того что мы забинидли текстом
      const handler = route.func.bind(this) // связали текущий контекст и функцию
      this.router[route.method](route.path, handler)
    }
  }
}
