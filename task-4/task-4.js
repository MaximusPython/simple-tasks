// работа eventloop последовательность фаз

const fs = require('fs')

console.log('Init 1')

setTimeout(() => {
  console.log(performance.now(), 'Timer 0 5')
}, 0)

setImmediate(() => {
  console.log('Immediate 8')
})

fs.readFile(__filename, () => {
  console.log('File raaded 9')
})

setTimeout(() => {
  for (let i = 0; i < 1000000; i++) {}
  console.log('Done 6')
  Promise.resolve().then(() => {
    console.log('Promise 7') // внутри сет таймаута дольше промис будет работать
  })
}, 0)

Promise.resolve().then(() => {
  console.log('Promise 4')
}) // промис быстрее отработает этот

process.nextTick(() => console.log('tick 3')) // еще быстрее чем промис отработает

console.log('Final 2')
