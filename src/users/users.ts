import express from 'express' // чтобы не было ошибки нужно скачать npm i -D @types/express

const UserRouter = express.Router()

UserRouter.use((req, res, next) => {
  console.log('Обработчик users')
  next() // также будет тригираться этот роутер при запросе ('/login', /register
}) // обработчик роут можем вешать как все приложение, как на отдельный метод у app, так и на отдельный роутинг (как тут стр 5)

UserRouter.post('/login', (req, res) => {
  // при запросе login будем отдавать "login"
  res.send('login')
})

UserRouter.post('/register', (req, res) => {
  // при запросе register будем отдавать "register"

  res.send('register')
})

// привяжем наш роутер к корневому приложению

export { UserRouter }
