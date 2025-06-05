const num: number = 2
console.log(num)

//=================================

type Person = {
  id: number
  age: number
  name: string
  firstname: string
}

const man: Person = {
  id: 1,
  age: 23,
  name: 'Kolya',
  firstname: 'Ivanov',
}

//=================================
let varibale: number = 20 // явная выводимая типизация
let variable = 3 // ts сам укажет тип

//=================================

// Структурная взаимозамяеномсть если функция ожидает тип юзер а ты передашь тип мэн то функция примет ее
type User = {
  name: string
  firstname: string
}

type Man = {
  name: string
  firstname: string
}

//=================================
// О Типах можно думать как о множествах

// обьединение Union | как логическое или

let data: Number | String // или число или строка
data = 22
data = 'Ivan'

//=================================
// 1 обьединение может быть когда поля содержатся в итоговом типе поля первого типа
// 2 обьединение может быть когда поля содержатся в итоговом типе поля второго типа
// 3 обьединение может быть когда поля содержатся в итоговом типе поля первого и второго типа (см пример ниже)

type MainInfo = {
  name: string
  lastname: string
}

type AdditionalInfo = {
  age: number
}

type FullInfo = MainInfo | AdditionalInfo

const info0: FullInfo = { name: 'max', lastname: 'ivanov', age: 122 }
const info1: FullInfo = { name: 'ivan', lastname: 'sergeev' }
const info2: FullInfo = { age: 22 }

console.log(info0) // { name: 'max', lastname: 'ivanov', age: 122 }
console.log(info1) // { name: 'ivan', lastname: 'sergeev' }
console.log(info2) // { age: 22 }

// пересечение intersection & как логическое и
// это когда в итоговом типе будет результат того что есть в первом типе и во втором типе (это работает только с обьектами)

type MainName = {
  name: string
  lastname: string
}

type AdditionalName = {
  age: number
}

type FullName = MainName & AdditionalName

const name0: FullName = { name: 'vasya', lastname: 'petrov', age: 12 }

console.log(name0) // { name: 'vasya', lastname: 'petrov', age: 12 }

//==========================================

// Надтип (super type) и Подтип (sybtype)
// Надтип это что типа базового класса - родителя от которого наследуется Подтип при структурной типизации

type SuperType = {
  name: string
}

type SybType = {
  name: string
  age: number
}

// тип у которого полей больше чем у другого типа может спокойно присваиваться (от больше к меньшеу работает)
// Т е обьект подтипа может быть присвоен переменной надтипа, наооборот уже нет

const subtype: SybType = { name: 'Vova', age: 25 }
const superType: SuperType = subtype

console.log(superType) // { name: 'Vova', age: 25 }

// ==================================
// const superType2: SuperType = { name: 'Vova' }
// const subType2: SybType = superType2

// console.log(subType2) // от меньшего к большему уже нельзя

// ==============================================

// Специальные типы

// ANY
let value: any
value = 2
value = {}
value = []

function logData(data: any) {
  // указыаем тип явно чтоб не было красной полосы
  console.log(data)
}

// any являтся и супертипом и над типом
// ======================
// UNKNOWN

function logData2(data2: unknown) {
  let value2: string
  if (typeof data2 === 'string') {
    value2 = data2
  }
}

// unknown нужен когда мы незнаем какой тип ожидается на вход, мы делаем его неизвестным
// и потом за счет проверок безопасно его обработать

// unknown является супертипом но не может быть над типом

let value3: unknown
value3 = 211
value3 = 'hi'
value3 = true
// работать так будет

// но так работать уже не будет так как unknown является супертипом и не может быть подтипом не для кого см ниже
// let value4: unknown
// let str2: string = value4

// ===============================
// NEVER
// противоположность unknown
// NEVER является подтипом для всех но не является надтипом (пустое множество то что не может сущестовать)

// тип NEVER используется в функции которая ошибку возращает или бесконечный цикл

let value5: never
// let str3: string = value5 // never можно присвоить к любому типу

// let str4: string = '200'
// let value6: never = str4 // но присвоить другой тип для never уже нет

enum Values { // enum это перечисление набор каких то значений
  FIRST,
  SECOND,
  THIRD, // добавим третье значение
}

function fn(value: Values) {
  switch (value) {
    case Values.FIRST:
      return value
    case Values.SECOND:
      return value
    default:
      // const exhaustiveCheck: never = value // мы какбы защищакм чтоб никто не добавлял третье значение
      return value
  }
}

console.log(fn(Values.FIRST)) // 0
console.log(fn(Values.SECOND)) // 1

// ===================================================

// VOID
// void означает что функция ничего не возвращает

function fn2(): void {
  // даже если функция ничего не возвращает по умолчанию функция все равно возращает undefined
  console.log()
}

type Fn = (arg: number, arg2: string) => void // создан тип для функции которая ничего не возвращает

// ===================================================
// Составные типы

// Описание типов для обьекта

interface User2 {
  firstname: string
  age: number
}
// существет два способа, примерно одно и тоже
type User3 = {
  firstname: string
  age: number
}

//------------------------------
//также это вложить в друг друга можно
interface Address {
  city?: string
  street?: string
  coords: number[]
}
// существет два способа, примерно одно и тоже
type User4 = {
  firstname?: string
  age?: number
  address: Address
}

const user5: User4 = {
  address: {
    // В типе "{ coords: number[]; }" отсутствуют следующие свойства из типа "Address": city, streetts(2739)
    // чтобы это исправить нужно добавить в те поля знак ?
    coords: [222, 4],
  },
}

//-----------------------------------

const users: User4[] = [] // если мы хотим обьявить массив юзеров то к типу мы добавляем квадратные скобки

// так же это можно использовать в реакте например мы пишем компонент и хотим указать какие пропсы стоит ожидать на вход то

type ComponentProps = {
  classname: string
  age: number
}

//----------------------
// также можно типизировать ответ от сервера который к вам приходят

type ApiResponse<T> = {
  status: 'success' | 'error'
  data?: T
}

//----------------------
// также мы можем описывать функцию лучше использовать type

type Onclick = (event: string) => void

//=================================================
// ЛИТЕРАЛЫ

// Литералы это конкретные значения которые мы можем использовать как тип
// это делается чтобы сузить значения

type Color = 'red' | 'green' | 'blue'

const color: Color = 'blue' // другой цвет кроме троих назначенных мы передать уже не сможем

type Size = 2 | 4

type Bool = false

// получившийся тип с литералами мы можем передать например аргументом в функцию

const color2 = 'yellow'

function paint(color2: Color) {
  return color2
}

console.log(color2) // yellow

//-----------------------------------

const values7 = {
  color: 'green',
} as const

// если мы хотим чтобы свойства больше не кем не менялись надо писать as const

// values7.color = 'ddw' поменять уже так просто не получится

// в интерфейсах риад онли пишется так см ниже
interface User2 {
  readonly age2: number
  name2: string
}
