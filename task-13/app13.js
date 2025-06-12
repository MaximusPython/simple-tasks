// fork запускает процесс с указаным файлом а не просто процесс как exec и spawn
// это тоже выделяет наши вычесления в отдельный процесс

const { fork } = require('child_process') // используем для этого библиотеку

const forkProcess = fork('fork.js') // получаем форк

forkProcess.on('message', (msg) => {
  console.log(`Получено сообщение: ${msg}`) // получаем само сообщение из файл fork.js
})

forkProcess.on(`close`, (code) => {
  console.log(`Exited: ${code}`)
})

forkProcess.send(`Ping`) // передаем сообщение нашему процессу
forkProcess.send(`disconnect`) // передаем сообщение что завершить процесс

// отправляем сообщение  через .send получаем обратно через message, ну и подписываемся на ошибку
