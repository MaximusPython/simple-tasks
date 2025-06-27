import 'reflect-metadata';

import express, { Express } from 'express'; // Express это интерфейс описывающий приложение
import { Server } from 'http'; // импортируем тип сервер
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.controller.js';
import { ExeptionFilter } from './error/exeption.filter.js';
import { Ilogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { IConfigService } from './config/config.service.interface.js';
import { ConfigService } from './config/config.servive.js';
import { TYPES } from './types.js';
import { json } from 'body-parser';
import { PrismaService } from './database/prisma.service.js';

@injectable()
export class App {
	app: Express; // задали типы
	server: Server;
	port: number;
	// userController: UserController // такая запись уже не актуальна
	// exeptionFilter: ExeptionFilter

	constructor(
		// передаем логи извне
		// передали значения
		@inject(TYPES.Ilogger) private logger: Ilogger, // передаем также по inversifyjs
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ConfigServie) private configService: IConfigServie,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
		// this.userController = userController // такая запись уже не актуальна
		// this.exeptionFilter = exeptionFilter
	}
	useRoutes(): void {
		this.app.use('/users', this.userController.router); // this потому что мы работаем внутри класса
	}

	useMiddleware(): void {
		// таким образом у нас глобально будет парсить json, берет body и кладет его в req.body, без него будет приходить просто undefined
		this.app.use(json());
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter)); // не забываем забиндить метод
	}
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes(); // запускаем этот роут
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
