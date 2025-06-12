const { compute } = require('./factor')

process.on('message', (msg) => {
  //импортируем функцию compute из факториала и передаем наше сообщение в нее и отправляем результат вычесления и дисконектится
  process.send(compute(msg))
  process.disconnect()
})
