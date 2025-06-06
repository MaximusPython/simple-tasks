interface Persons {
  id: number
  name: string
  age: number | string
  isAdmin?: boolean
}

type PeopleArray = Persons[]

interface Orders {
  id: number
  userId: number
  product: string
  price?: any
}

type OrdersArray = Orders[]

// 1. Данные пользователей
const users: PeopleArray = [
  { id: 1, name: 'John', age: 25, isAdmin: false },
  { id: 2, name: 'Alice', age: 30, isAdmin: true },
  { id: 3, name: 'Bob', age: 'twenty' },
]

// 2. Функция для получения пользователя по ID
function getUserById(id: number): Persons | undefined {
  if (Array.isArray(users)) return users.find((user: Persons) => user.id === id)
  else {
    console.log(`Неверный тип у ${users}`)
    return undefined
  }
}

// 3. Данные заказов
const orders: OrdersArray = [
  { id: 1, userId: 1, product: 'Laptop', price: 1000 },
  { id: 2, userId: 2, product: 'Phone', price: '500' },
  { id: 3, userId: 3, product: 'Tablet' },
]

// 4. Функция для получения заказов пользователя
function getUserOrders(userId: number): Orders[] | undefined {
  if (typeof userId !== 'number') {
    console.log(`Неверный тип у ${userId}`)
    return undefined
  }
  const ordersUsers = orders.filter((order: Orders) => order.userId === userId)
  return ordersUsers
}

// 5. Функция для подсчета общей суммы заказов пользователя
function getTotalUserOrderPrice(userId: number): number | undefined {
  const userOrders = getUserOrders(userId)
  if (Array.isArray(userOrders))
    return userOrders.reduce((total, order: Orders) => total + order.price, 0)
  else {
    console.log(`Неверный тип у ${userOrders}.`)
    return undefined
  }
}

console.log(getUserById(2)?.name ?? 'Пользователь не найден') // опциональная цепочка Optional Chaining
console.log(getUserById(5)?.name ?? 'Пользователь не найден')

const total = getTotalUserOrderPrice(1)
if (typeof total === 'number') {
  console.log(`Total: $${total.toFixed(2)}`)
} else {
  console.log('Не удалось вычислить сумму заказов.')
}

//=========================================================================================
// Задача: создать рядом файл task.ts и перенести в него код из task.js.
// Что нужно сделать (задание):
// Определить интерфейсы/типы для User и Order
// Добавить аннотации типов для всех функций
// Исправить потенциальные ошибки (например, обработку undefined)
// Использовать TypeScript для проверки типов данных (например, age должно быть number)
// Добавить обработку случаев, когда данные могут быть неполными или неверными
// Ожидаемые улучшения после преобразования в TypeScript:
// Ошибки с типами будут обнаружены на этапе компиляции
// Код станет самодокументируемым
// Исчезнут runtime-ошибки вроде Cannot read property 'name' of undefined
// Функции будут явно указывать, могут ли они вернуть undefined
// Неявные преобразования типов (например, строки в числа) будут исключены
