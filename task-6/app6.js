const crypto = require('crypto')

process.env.UV_THREADPOOL_SIZE = 8 // увеличиваем до 8 ядра и теперь по 8 будет выводить, в практике не так часто выполняется

const start = performance.now()

for (let i = 0; i < 50; i++) {
  crypto.pbkdf2('test', 'salt', 100000, 64, 'sha512', () => {
    console.log(performance.now() - start)
  })
}

// 48.137584000000004 по 4 пачке выдает так как 4 ядря и 4 треда
// 55.35000000000001
// 55.46183400000001
// 55.57525000000001
// 86.81883400000001
// 87.10600000000001
// 88.040042
// 88.60925
