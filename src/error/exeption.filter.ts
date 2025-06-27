import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service.js';
import { IExeptionFilter } from './exeption.filter.interface.js';
import { HTTPError } from './http-error.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types.js';
import { Ilogger } from '../logger/logger.interface.js';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	//logger: LoggerService // раньше свойства мы передавали явно, дальше мы будем делать это через контейнер
	constructor(@inject(TYPES.Ilogger) private logger: Ilogger) {
		// inject декоратор который принимает идентификатор - TYPES (токен), т е вместо inject подставиться инстанс логера
		//   this.logger = logger // так уже мы не делаем
	}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`err: ${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
