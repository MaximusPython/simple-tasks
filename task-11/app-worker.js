// тут мы используем уже ассинхронный код с нашими воркерами
//  скорость выполнения намного быстрее duration: 54.117208000000005,

const { Worker } = require('worker_threads')

const compute = (array) => {
  return new Promise((resolve, reject) => {
    // в промисе создаем наш воркер
    const worker = new Worker('./worker.js', {
      // создали воркер из файла воркер js и добавили вторым параметром данные исходного массива
      workerData: {
        // вторым параметром передаем опции исходные данные массива
        array,
      },
    })

    worker.on('message', (msg) => {
      // воркер может обрабатывать события подписки, message это означает пришел ответ
      console.log(worker.threadId) // смотрим также id нашего потока
      resolve(msg) // возвращаем наш msg
    }) // ниже смотрим другие подписки
    worker.on('error', (err) => {
      reject(err) // обработка ошибки
    })
    worker.on('exit', () => {
      console.log('Завершил работу') // завершение работы
    })
  })
}

const main = async () => {
  // переписали ниже на последовательное ожидание промисов
  // делая нашу функцию ассинхронной ожидая когда все наши события будут исполняться через promise all
  performance.mark('start')
  const result = await Promise.all([
    compute([24, 23, 21, 42, 20, 44]),
    compute([24, 23, 21, 42, 20, 44]),
    compute([24, 23, 21, 42, 20, 44]),
    compute([24, 23, 21, 42, 20, 44]),
  ])

  console.log(result)
  performance.mark('end')
  performance.measure('main', 'start', 'end')
  console.log(performance.getEntriesByName('main').pop())
}

setTimeout(() => {
  // функция отработается быстрее так как тут ассинхронный код
  console.log('Timeout')
}, 2000)

main()
