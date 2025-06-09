const EventEmitter = require('events')

const MyEmitter = new EventEmitter()

MyEmitter.on('sms', (data) => {
  console.log(`Получил: ${data}`)
})

MyEmitter.emit('sms', 'все ок')

//======================================
console.log(MyEmitter.getMaxListeners())
MyEmitter.setMaxListeners(2) // установили свое максимальное число слушателей
console.log(MyEmitter.getMaxListeners())
console.log(MyEmitter.listenerCount('sms')) // посмотрели сколько всего слушателей на событии sms
console.log(MyEmitter.eventNames()) // выводит наши события

MyEmitter.on('error', (err) => {
  console.log(`Произошла ошибка ${err.message}`)
})

MyEmitter.emit('error', new Error('Boom!')) // обработака ошибки

//======================================
// эвент таргетт
const target = new EventTarget()

const logTarget = () => {
  console.log(`Connected to target`)
}

target.addEventListener('connected', logTarget)
target.dispatchEvent(new Event('connected'))

//На стороне бэкэнда Node.js предлагает нам возможность построить аналогичную систему с использованием eventsмодуля .

// В частности, этот модуль предлагает EventEmitterкласс, который мы будем использовать для обработки наших событий.

// Вы инициализируете это с помощью

// const EventEmitter = require('node:events');
// const eventEmitter = new EventEmitter();

//-------------------------------------------------------
// Этот объект предоставляет, среди прочего, методы onи emit.

// emitиспользуется для запуска события
// onиспользуется для добавления функции обратного вызова, которая будет выполнена при возникновении события

//-------------------------------------------------------

// Объект EventEmitter также предоставляет несколько других методов для взаимодействия с событиями, например:

// once(): добавить одноразового слушателя за эмититься один раз
// removeListener()/ off(): удалить прослушиватель событий из события
// removeAllListeners(): удалить всех слушателей события
// чтобы сделать стобы определнный слушатель выводился  первый нужно делать prepand
