const { parentPort, workerData } = require('worker_threads')

const { compute } = require('./factor')

parentPort.postMessage(compute(workerData)) // отправляем пост мессежд с исходными данными в parent process
