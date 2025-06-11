// измерение производительности

const perf_hooks = require('perf_hooks')

test = perf_hooks.performance.timerify(test) // если нам нужно измерить функцию, то используем timerify, мы обернули нашу функцию в измерение добавления таймера отчета

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries())
    const entry = items.getEntriesByName('slow').pop()
    console.log(`${entry.name}: ${entry.duration}`)
    observer.disconnect()
  }
)
performanceObserver.observe({ entryTypes: ['measure', 'function'] }) // function нужен чтобы добавить нашу performance.timerify(test)

function test() {
  const arr = []
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i)
  }
}

function slow() {
  // когда нам нужно измерить performance куска кода то надо использовать mark start end measure
  performance.mark('start') // отметка делаем начала отчета
  const arr = []
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i)
  }
  performance.mark('end') // отметка делаем конца отчета
  performance.measure('slow', 'start', 'end') // измеренеие между двумя отметками
}
slow() // вызов slow()
test() // вызов test()
