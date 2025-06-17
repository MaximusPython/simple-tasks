class Coard {
  // описание класса
  message = '1'
  lat: number
  long: number

  protected test() {
    if (this.lat > 0) {
    }
  }

  distance(newLat: number, newLong: number): number {
    //метод в классе
    return 0
  }

  constructor(lat: number, long: number) {
    // внутри класса сконструируем класс (инициализация)
    this.lat = lat
    this.long = long
    console.log(this.message)
  }
}

const point = new Coard(0, 1)

class MapLocation extends Coard {
  name: string
  message: '2'

  override distance(newLat: number, newLong: number): number {
    //метод в классе
    console.log(this.name) // оверрайт метод
    this.test() // метод protected он доступен в исх классах и тех от которого он наследуется, в интсансе уже нет

    return 1 // override говорит что если с исходн функцией что то случитья будет ошибка
  }

  // создали класс и наследуемся от Coard
  constructor(lat: number, long: number, name: string) {
    // + name
    super(lat, long)
    // сначала отработает первый конструктор, потом конструктор в extend контсруктор
  }
}

//=================================================
// геттеры и сеттеры, можно добавить доп логику
class MapGet extends Coard {
  _surname: string

  get surname() {
    return this._surname
  }
  set surname(s: string) {
    this._surname = s + '_cool' // всегда в конце имени добавляем слово cool
  }
}
//=================================================

// имплементация (типа наследования только у интерфейса)

interface LoggerService {
  log: (s: string) => void
}

class Logger implements LoggerService {
  log(s: string) {
    // по умолчанию лог публичный метод

    // string нужно описать явно так как с интерфейса это не влияет
    console.log(s)
  }

  private error() {}
  private a = '' // переменная тоже может быть приватная
}

const l = new Logger()
l.log('d') // метод публичный поэтому можно обратиться так

//=========================================================

class MyClass {
  static a = '1'
}

MyClass.a // статическая переменная, есть еще и обьект
//=========================================================

class MyClass2<T> {
  az: T
} // bs будет строкой

const bs = new MyClass2<string>()
bs.az
//=========================================================

abstract class Base {
  // у абстрактных классов нельзя делать инстанс
  print(s: string) {
    console.log(s)
  }
  abstract error(s: string): void // абстрактный метод который нужно прописать уже в классе
}

class BaseExtend extends Base {
  // вместо инстанс такая запись
  error(s: string): void {} // метод error нужно прописать обязательно
}

new BaseExtend().print('s') // и теперь так

// =================================

class Animal {
  name: string
}

class Dog {
  name: string
  tail3: boolean
}

const puppy: Animal = new Dog() // ts с узит класс только до name
//2. Назначение
// Обычный класс: Используется для создания конкретных объектов с полной реализацией.
// Абстрактный класс: Предназначен для определения общей структуры, свойств и методов, которые должны реализовать подклассы.
