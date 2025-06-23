function Component(id: number) {
  console.log('init component')
  return (target: Function) => {
    console.log('run component')
    target.prototype.id = id
  }
}

function Logger() {
  console.log('init logger')
  return (target: Function) => {
    console.log('run logger')
  }
}

function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor // эти свойства доступны у методов декоратов
) {
  console.log(propertyKey)
  const oldValue = propertyDescriptor.value
  propertyDescriptor.value = function (...args: any[]) {
    return args[0] * 10 // переопределяем метод (умножим число на 10)
  }
}

function Prop(target: Object, propertyKey: string) {
  let value: number

  const getter = () => {
    console.log('get')

    return value
  }
  const setter = (newValue: number) => {
    console.log('set')
    value = newValue
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  }) // мы можем дополнить наши свойства
}

function Param(target: Object, propertyKey: string, index: number) {
  console.log(propertyKey, index)
} // index еще получаем // будет 0 мы находим индекс переданного параметра в updateId(@Param newId: number)

@Logger()
@Component(1) //декаратор инициализируется - некий вызов функции Component
export class Person {
  @Prop id: number // декаратор на свойства

  @Method
  updateId(@Param newId: number) {
    // вывод будет updateId 0
    // декоратор на парам
    this.id = newId
    return this.id
  }
}

console.log(new Person().id)
console.log(new Person().updateId(1))

// вывод
// updateId 0
// updateId
// init logger
// init component
// run component
// set
// run logger
// undefined
// 10
//=============================================
// 1. Основы декораторов:

// Декораторы часто используются в TypeScript и представляют собой экспериментальную функцию.
// В JavaScript декораторы находятся на стадии предложения, их реализация отличается от TypeScript.
// Декораторы используются для метапрограммирования и передачи метаинформации в функции.
// Синтаксис декоратора начинается с символа @, например: @component.
// 2. Типы декораторов:

// Декоратор класса
// добавляет метаинформацию для класса.
// Декоратор свойства
// применяется к свойствам класса.
// Декоратор метода
// используется для методов класса.
// Декоратор параметра
// применяется к параметрам метода класса.
// 3. Порядок выполнения декораторов:

// Декораторы инициализируются сверху вниз, но исполняются в обратном порядке.
// 4. Создание декоратора:

// Декораторы являются функциями, которые могут принимать параметры и изменять поведение класса, его свойств или методов.
// 5. Примеры использования:

// Декоратор класса: Может использоваться для логирования или инициализации компонентов.
// Декоратор метода: Позволяет модифицировать результаты работы метода, например, умножая возвращаемое значение на 10.
// Декоратор свойства: Можно использовать для создания кастомных геттеров и сеттеров.
// Декоратор параметра: Предоставляет возможность взаимодействовать с конкретными параметрами методов.
// 6. Применение в dependency injection (DI):

// Декораторы обеспечивают эффективный механизм для реализации системы DI, позволяя определять и управлять зависимостями в приложениях.
