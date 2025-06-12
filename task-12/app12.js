// spawn показывает указанный процесс
const { spawn } = require('child_process')

const childProcess = spawn('ls')

childProcess.stdout.on('data', (data) => {
  // пописываемся на получение данных
  console.log(`Stdout: ${data}`)
})
childProcess.stderr.on('data', (data) => {
  // пописываемся на получение данных ошибки

  console.log(`Stderror: ${data}`)
})
childProcess.on('exit', (code) => {
  // выходим из процесса
  console.log(`Код выхода: ${code}`)
})

// результат выполения будет
// Stdout: app12.js
// test1.js
// test2.js

// Код выхода: 0
