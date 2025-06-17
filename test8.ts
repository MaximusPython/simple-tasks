let a2 = 'Привет'

if (typeof a2 === 'string') {
}

let b2: typeof a2

//======================================

type Coard3 = {
  let: number
  long: number
}

type P = keyof Coard

let a4: P = 'long' // поможет получить ключи в виде типов
//======================================

function log(s: string | null): void {
  if (s === null) {
  } else {
    s?.toLowerCase()
  }
}

//======================================
const ww: bigint = BigInt(100) // Тип: bigint — это числовой тип, предназначенный для работы с очень большими целыми числами, превышающими возможности типа number.

const dds: symbol = Symbol('sdwdw') //Несмотря на одинаковую строку 'sdwdw', dds и swq — это разные символы, потому что каждый вызов Symbol() создает уникальный объект.

const swq: symbol = Symbol('sdwdw')
