// spawn и exec дают возможность запускать паралельно процесс
// они дают возможнсть выполнить в шеле скрипт получить отпут и с отпутом работать

const { exec } = require('child_process')

const childProcess = exec('ls', (err, stdout, stderr) => {
  if (err) {
    // кол бэк имеет три аргумента
    console.error(err.message) // обработка ошибки
  }
  console.log(`stdout: ${stdout}`) //выводим наши данные
  console.log(`stderr: ${stderr}`)
})

childProcess.on('exit', (code) => {
  // подписываемся на выход, прнимает код выхода
  console.log(`Код выхода: ${code}`)
})

// в консоли будет
// Код выхода: 0      это stdout
// stdout: app12-2.js
// app12.js
// test1.js
// test2.js

// stderr:  это stderr

// эти вещи нужны чтобы взаимодейтсвовать с другими утилитами нашей системы
