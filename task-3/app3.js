function myFunc(arg) {
  console.log(`Аргумент => ${arg}`)
}

setTimeout(myFunc, 1500, 'Классный')

const timerId = setTimeout(() => {
  console.log('BOOM!')
}, 4000)

setTimeout(() => {
  clearTimeout(timerId)
  console.log('Очищено')
}, 1000)
