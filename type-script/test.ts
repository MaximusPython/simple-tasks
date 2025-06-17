let a: number = 3
let b: string = '2'
let c: number = a + Number(b) // привели строку b в число = 5
console.log(c)

let d = true

// если мы обьявили массив строк то в массиве должны быть только строки
let names: string[] = ['sw', 'dwdwdw']
// если мы обьявили массив чисел то в массиве должны быть только числа
let ages: number[] = [3, 4]

// также есть кортежи, первый элемент будет числом а второй строкой
let tup: [number, string] = [2, 'wff'] // с ним работают с массиов ограниченной длины и определнном типом
tup.push('dwdwd')

let e: any = 2
e = 'dw'
e = true

let anyArr: any[] = ['wdw', 2, true]

function greet(name: string): string {
  return name + 'h2'
}

names.map((x: string) => x) // задали тип для

function coord(coord: { lat: number; long: number }) {
  //обьявили обьектный тип, здесь 2 свой-ва долгота и широта
  // в реальной жзини эту запись нужно выводить в интерфейс а потом уже присваивать
}
