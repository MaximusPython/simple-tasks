import { NextFunction, Request, Response, Router } from 'express'

export interface IControllerRoute {
  path: string // передаем путь по которому будем биндить
  func: (req: Request, res: Response, next: NextFunction) => void // передаем функцию которою мы будем биндить
  // method: 'get' | 'post' | 'delete' | 'patch' | 'put' // нам нужен метод который будет биндить функцию к путю
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'> // берет из интерефейса значения и создает новый интерфейс с этими переданными значениями
}
