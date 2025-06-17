import express, { Express } from 'express' // Express это интерфейс описывающий приложение
import { UserRouter } from './users/users'
import { Server } from 'http' // импортируем тип сервер
import { LoggerService } from './logger/logger.service'

export class App {
  app: Express // задали типы
  server: Server
  port: number
  logger: LoggerService

  constructor(logger: LoggerService) {
    // передаем логи извне
    // передали значения
    this.app = express()
    this.port = 8000
    this.logger = logger
  }

  useRoutes() {
    this.app.use('/users', UserRouter) // this потому что мы работаем внутри класса
  }

  public async init() {
    this.useRoutes() // запускаем этот роут
    this.server = this.app.listen(this.port)
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
  }
}
