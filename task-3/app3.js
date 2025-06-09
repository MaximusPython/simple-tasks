function myFunc(arg) {
  console.log(`Аргумент => ${arg} 5`)
}

setTimeout(myFunc, 1500, 'Классный')

//==========================================

const timerId = setTimeout(() => {
  console.log('BOOM!')
}, 4000)
//==========================================

setTimeout(() => {
  clearTimeout(timerId)
  console.log('Очищено 4') // очистили таймер, также можно очистить интервал
}, 1000)

console.log('Перед 1')
//==========================================

setImmediate(() => {
  console.log('После всего 3')
})

console.log('После 2')
//==========================================
const timerId2 = setTimeout(() => {
  console.log('BOOM! 6')
}, 4000)

timerId2.unref() // принудительно завершить приложение не дожидаясь таймера

//==========================================

setImmediate(() => {
  timerId2.ref() // вернули ссылку на таймер
})
