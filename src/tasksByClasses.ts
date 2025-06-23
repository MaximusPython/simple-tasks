//====================================================
class Clock {
  constructor({ template }) {
    this.template = template
    this.timer = null
  }
  render() {
    let date = new Date()

    let hours = date.getHours()
    if (hours < 10) hours = '0' + hours

    let mins = date.getMinutes()
    if (mins < 10) mins = '0' + mins

    let secs = date.getSeconds()
    if (secs < 10) secs = '0' + secs

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs)

    console.log(output)
  }

  stop = function () {
    clearInterval(this.timer)
  }

  start = function () {
    this.render()
    this.timer = setInterval(() => this.render(), this.precision)
  }
}

const clock = new Clock({ template: 'h:m:s' })
clock.start()
//====================================================

class ExtendedClock extends Clock {
  constructor({ template, precision = 1000 }) {
    super({ template })
    this.precision = precision
  }
}

const extendClock = new ExtendedClock({ template: 'h:m:s', precision: 2000 })
extendClock.start()
//====================================================

class Rabbit extends Object {
  constructor(name) {
    super(name)
  }
}
let rabbit = new Rabbit('kING')
alert(rabbit.hasOwnProperty('name'))

//====================================================

// Почему instanceof в примере ниже возвращает true? Мы же видим, что a не создан с помощью B().

// ответ потому что у них задан одинаковый прототип {}
function A() {}
function B() {}

A.prototype = B.prototype = {}

let a = new A()

alert(a instanceof B) // true
