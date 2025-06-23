import express, { Express } from 'express' // Express это интерфейс описывающий приложение
import { Server } from 'http' // импортируем тип сервер
import { LoggerService } from './logger/logger.service.js'
import { UserController } from './users/user.controller.js'
import { ExeptionFilter } from './error/exeption.filter.js'
import { Ilogger } from './logger/logger.interface.js'

export class App {
  app: Express // задали типы
  server: Server
  port: number
  logger: Ilogger
  userController: UserController
  exeptionFilter: ExeptionFilter

  constructor(
    // передаем логи извне
    // передали значения
    logger: Ilogger,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express()
    this.port = 6000
    this.logger = logger
    this.userController = userController
    this.exeptionFilter = exeptionFilter
  }
  useRoutes() {
    this.app.use('/users', this.userController.router) // this потому что мы работаем внутри класса
  }

  useExeptionFilter() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter)) // не забываем забиндить метод
  }
  public async init() {
    this.useRoutes() // запускаем этот роут
    this.useExeptionFilter()
    this.server = this.app.listen(this.port)
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
  }
}
