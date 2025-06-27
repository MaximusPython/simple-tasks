import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app.js'; // импортируем класс app
import { ExeptionFilter } from './error/exeption.filter.js';
import { Ilogger } from './logger/logger.interface.js';
import { IExeptionFilter } from './error/exeption.filter.interface.js';
import { LoggerService } from './logger/logger.service.js';
import { TYPES } from './types.js';
import { UserController } from './users/user.controller.js';
import { UserControllerInterface } from './users/user.controller.interface.js';
import { IuserService } from './users/user.service.interface.js';
import { UserService } from './users/user.service.js';
import { ConfigService } from './config/config.servive.js';
import { PrismaService } from './database/prisma.service.js';
import { IUsersRepository } from './users/users.repository.interface.js';
import { UserRepository } from './users/users.repository.js';

// тут будет сборка приложения, зависимости , инициализация приложения
// async function bootstrap() {
// const logger = new LoggerService()
// const app = new App(
//   logger, // получилась точка сбора зависимостей
//   new UserController(logger),
//   new ExeptionFilter(logger)
// ) // в наше приложение ведряем зависимости от другого сервиса это и есть depency injection

// такая старая запись уже не актуальна так как все модули находятся в корневом файле сделаем код еще лучше
// const appContainer = new Container() // ниже собирваем контейнер (биндим компоненты)
// appContainer.bind<Ilogger>(TYPES.Ilogger).to(LoggerService) // получается интерфейса у нас только два
// appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter) // мы берем интерфейс Ilogger со значением LoggerService и задаем ему токен TYPES.Ilogger, который потом будем использовать где угодно
// appContainer.bind<UserController>(TYPES.UserController).to(UserController) // тут мы класс уже связываем
// appContainer.bind<App>(TYPES.Application).to(App)
// const app = appContainer.get<App>(TYPES.Application)
// app.init() // запускаем наше приложение
// await app.init() // инициализируем наше приложение

// export { app, appContainer } // берем инстансы нашего app и appContainer

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

// модульность
export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	// далее этот модуль мы можем переиспользовать
	// мы сделали отдельный модуль куда мы положили все наши биндинги
	bind<App>(TYPES.App).to(App);
	bind<Ilogger>(TYPES.Ilogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.Ilogger).to(ExeptionFilter);
	bind<IUserController>(TYPES.Ilogger).to(UserController);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IuserService>(TYPES.ExeptionFilter).to(UserService); // тут типы и их значения
	bind<UserControllerInterface>(TYPES.UserController).to(UserController);
	bind<IUsersRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope(); // данный метод не вызывает несколько раз инстанс будет передан один раз туда где есть inject
});

function bootstrap(): IBootstrapReturn {
	// выделяем логику нашу сборку в отдельную функцию
	const appContainer = new Container();
	appContainer.load(appBinding); // загружаем наш модуль с биндингами в контейнер
	const app = appContainer.get<App>(TYPES.App);
	app.init(); // инициализац приложения
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
