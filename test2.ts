let universalId: number | string = 4 // пример юнион типа
universalId = 'dwdww'

function printId(id: number | string) {
  if (typeof id == 'string') {
    console.log(id.toUpperCase()) //если хотим использовать метод строчный только, но у нас же еще и number есть, то мы используем сужение типа (проверку type of)
  } else {
    console.log(id) // в else ts видит уже id как number
  }
}

function helloUser(user: string | string[]) {
  // еще пример как разводить типы (чтобы не писать any)
  if (Array.isArray(user)) {
    console.log(user.join(',') + 'H1!') // тут мы работаем string[]
  } else {
  }
  console.log(user + 'h1') // тут уже как просто string
}
