// 5.1. Использование worker threads

// здесь представлен пример синхронной функции, и блокирования потока
// продолжительность состовляет     duration: 2230.4722500000003,

const factorial = require('./factorial')

const compute = (array) => {
  const arr = []
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i)
  }
  return array.map((el) => factorial(el))
}

const main = () => {
  performance.mark('start')

  const result = [
    compute([24, 23, 21, 42, 20, 44]),
    compute([24, 23, 21, 42, 20, 44]),
    compute([24, 23, 21, 42, 20, 44]),
    compute([24, 23, 21, 42, 20, 44]),
  ]

  console.log(result)
  performance.mark('end')
  performance.measure('main', 'start', 'end')
  console.log(performance.getEntriesByName('main').pop())
}
// функция отработается позже так как тут синхронный код
setTimeout(() => {
  console.log('Timeout')
}, 2000)

main()
