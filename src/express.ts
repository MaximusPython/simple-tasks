// import express, { Request, Response, NextFunction } from 'express' // импортируем типы из express
// import { UserRouter } from './users/users'

// const port = 8000

// const app = express()

// app.use((req, res, next) => {
//   // мы можем задать обработчик не только на конкертный роут а на все приложение
//   console.log('Время ', Date.now()) // это middleware глобально на все приложение, будет возращать время захода нашего
//   next()
// }) // также такой обработчик можно сделать сo всеми запросами hello (если захотим)

// app.get(`/hello`, (req, res) => {
//   res.end() // res нужно вызывать чтобы route разрезолвился
// })

// app.use('/users', UserRouter) // в рамках use мы передаем корневой роут и сам роутер который будет обрабатывать

// // app.get('/hello', (req, res) => {
// //   res.send({ success: true }) // можно отправить обьекты
// //   res.set('Content-Type', 'text/plain') // установка заголовка, можно еще через append
// //   res.type('application/json') // будет форсить content type appplication json, задаем тип в параметр заголовка
// //   res.download('/test.pdf') // можно сказать скачай такой файл, можно также использовать links ссылки
// //   res.redirect(301, 'https:///') // можно сделать ред директ, перенаправим пользо если он будет стучаться по этому роуту 301

// // //   res.cookie('token', 'sad2e2r', {
// // //     // работа с куками пользователя
// // //     domain: '',
// // //     path: '/',
// // //     secure: true,
// // //     expires: 60000,
// // //   })
// // //   res.clearCookie('token', { path }) // удаление куки через имя
// // //
// // })

// app.get(`/hello`, (req, res) => {
//   throw new Error('Error!!!') // будет выдавать ошибку на сервере, ее нужно обработать
// })

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   // указываем эти типы
//   // обработка ошибки, можно логику прописать какую нибудь
//   console.log(err.message) // берем текст нашей ошибки
//   res.status(500).send(err.message) // пользователю вернем текст ошибки
// })

// app.listen(port, () => {
//   console.log(`Сервер запущен на ${port}`)
// })
