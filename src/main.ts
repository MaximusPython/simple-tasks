import { App } from './app.js' // импортируем класс app
import { ExeptionFilter } from './error/exeption.filter.js'
import { LoggerService } from './logger/logger.service.js'
import { UserController } from './users/user.controller.js'

// тут будет сборка приложения, зависимости , инициализация приложения
async function bootstrap() {
  const logger = new LoggerService()
  const app = new App(
    logger, // получилась точка сбора зависимостей
    new UserController(logger),
    new ExeptionFilter(logger)
  ) // в наше приложение ведряем зависимости от другого сервиса это и есть depency injection
  await app.init() // инициализируем наше приложение
}

bootstrap()
