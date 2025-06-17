// литеральные типы

// строковые литералы

let ac = 'dwdd'

type direction = 'left' | 'right'

function moveDog(direction: direction) {}

moveDog('left') // строковые литералы ограничивают вход строк (либо right, либо left)

function moveDog2(direction: direction): -1 | 0 | 1 {
  switch (direction) {
    case 'left':
      return -1
    case 'right':
      return 1
    default: // для рантайма дефолт будет норм
      return 0
  }
}

interface IConnection {
  host: string
  port: number
}

function connect(connection: IConnection | 'default') {} // тут мы принимем либо обьект либо строку default (комбинирование)

connect('default')

const connection2 = {
  host: 'localhost',
  protocol: 'https' as 'https', // кастукм один тип к другому, строку к ограниченному строковому литералу https и ошибки не будет
}

function connect2(host: string, protocol: 'http' | 'https') {}

connect2(connection2.host, connection2.protocol) // вызываем функцию нашего коннекта передавая хост и протокол, будет ошибка в передачи так как protocol у нас строка, и если мы преедаем протокол то строка может быть изменена

//

// еще пример кастования

let bob: any = 5
let topi = bob as number // bob теперь number
