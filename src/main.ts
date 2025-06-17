import { App } from './app' // импортируем класс app
import { LoggerService } from './logger/logger.service'

// тут будет сборка приложения, зависимости , инициализация приложения
async function bootstrap() {
  const app = new App(new LoggerService()) // в наше приложение ведряем зависимость от другого сервиса это и есть depency injection
  await app.init() // инициализируем наше приложение
}

bootstrap()
