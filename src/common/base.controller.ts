import { Router, Response, Request } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface.js';
import { Ilogger } from '../logger/logger.interface.js';
import { injectable } from 'inversify';
export { Router } from 'express';
import 'reflect-metadata'; // там где используем injectable добавляем этот импорт

@injectable() // так как у дочернего класса мы добавили injectable то и тут у его у родителя тоже добавим, иначе работать не будет
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: Ilogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}
	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		return res.status(code).json(message);
	} // таких методов можно сделать несколько

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`); // вывод того что мы забинидли текстом
			const middleware = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this); // связали текущий контекст и функцию
			const pipeline = middleware ? [...middleware, handler] : handler;

			this.router[route.method](route.path, pipeline);
		}
	}
}
