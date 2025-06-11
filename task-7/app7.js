// не вссе работает на воркер тредс

const https = require('https')
const start = performance.now()

for (let i = 0; i < 50; i++) {
  https.get('https://yandex.ru', (res) => {
    res.on('data', () => {})
    res.on('end', () => {
      console.log(performance.now() - start)
    })
  })
}

// тут идет запрос напрямую на уровне ядра, с операциями сервером потоки не работают
