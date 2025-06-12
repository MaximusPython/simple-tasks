// Упражнение - Производительность потоков
// тут представлена реализация замеров воркера и форка

const { performance, PerformanceObserver } = require('perf_hooks') //импортируем performance, PerformanceObserver
const { Worker } = require('worker_threads')
const { fork } = require('child_process')

const performanceObserver = new PerformanceObserver((items) => {
  // запускаем наш обзервер и получаем items то что мы обзервем и получим из них getEntries и пройдемся по этим entry
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`) // и выведем имена entry и продолжительность
  })
})
performanceObserver.observe({ entryTypes: ['measure'] }) // опишем то что хотим обзервить entryTypes

const workerFunction = (array) => {
  // это воркер
  return new Promise((resolve, reject) => {
    performance.mark('worker start') // прописываем наши замеры функции у воркера
    const worker = new Worker('./worker1.js', {
      // тут создаем воркер, замер до этого
      workerData: {
        array, // передали наш массив
      },
    })

    worker.on('message', (msg) => {
      performance.mark('worker end') // прописали окончание замера после того как воркер отработал
      performance.measure('worker', 'worker start', 'worker end')
      resolve(msg)
    })
  })
}

const forkFunction = (array) => {
  // это форк
  return new Promise((resolve, reject) => {
    performance.mark('fork start') // прописываем наши замеры функции у форка
    const forkProcess = fork('./fork1.js')
    forkProcess.send({ array })
    forkProcess.on('message', (msg) => {
      performance.mark('fork end')
      performance.measure('fork', 'fork start', 'fork end')
      resolve(msg)
    })
  })
}

const main = async () => {
  await workerFunction([22, 32, 23, 44])
  await forkFunction([22, 32, 23, 44])
}

main()
