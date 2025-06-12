function foo() {
  function bar() {
    console.trace()
  }
  bar()
}

foo()

// console.trace() - это метод объекта console, который выводит в консоль подробную информацию о стеке вызовов на текущий момент.

setImmediate(() => {
  console.log('1') // выполнится после заврешения всего цикла event loop
})

setTimeout(() => {
  console.log('2')
})

process.nextTick(() => console.log('3')) // сразу выполниться
