process.on('message', (msg) => {
  if (msg == 'disconnect') {
    process.disconnect() // процесс должен завершится если если мы пришлем disconnect
    return // завершаем нашу функцию disconnect
  }
  console.log(`Клиент получил: ${msg}`)
  process.send('Pong')
})

// форкаем этот файл и передаем его в app13.js
