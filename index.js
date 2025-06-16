// import http from 'http' // создание обычного сервера через встроенную библиотеку node http

// const host = '127.0.0.1'

// const port = 8000

// const server = http.createServer((req, res) => {
//   // внутир обрабатываем запросы
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain') // установили хедер для проекта
//   res.end('Привет')
// })

// server.listen(port, host, () => {
//   // слушаем указанный нами порт и хост
//   console.log(` Сервер запущен на ${host}:${port}`)
// })

import express from 'express' // создание того же самого только через express

const port = 8000
const app = express()

app.all('/hello', (req, res, next) => {
  // сначала попадем сюда
  console.log('ALL')
  next() //чтобы all отработал нужно ставить его перед get
}) // при запросе любым методом нашего hello мы его обрабатываем, all это не запрос а middleware
// функция next передает в управление след по списку обработчику  - post --> app.all - /hello -----> app.post - /hello

const cb = (req, res, next) => {
  // потом сюда это промежуточная функция middlwaare
  // создали колбэк
  console.log('CB')
  next()
}

app.get('/hello', cb, (req, res) => {
  // можно сделать массив обьектов cb
  //потом сюда
  // '/he?l+o' можно обратиться hello, helo одна l не обязательна, + означает что можно обращаться helloooo, * вообще неограниченые символы
  // запросы post, put по такому же принципу обрабатываются
  res.send('Привет')
})

app // c помощью роут на одну сущность user можно добавлять несколько методов
  .route('/user')
  .get('/hello', (req, res) => {
    res.send('Привет!')
  })
  .post('/hello', (req, res) => {
    res.send('Привет POST')
  })

app.listen(port, () => {
  console.log(`Сервер запущен на ${port}`)
})
