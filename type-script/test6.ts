// generics

function log0(obj: string | number): string | number {
  console.log(obj) // такая запись не поможет, так как может придти строка а вернуться number , связать их мы не можем
  return obj
}
// придется дублировать код
function log2(obj: number): number {
  console.log(obj) // такая запись не поможет, так как может придти строка а вернуться number , связать их мы не можем
  return obj
}

// плэтому нужны generics

function log3<T>(obj: T): T {
  // это generics
  console.log(obj)
  return obj
}

log3<string>('wdw')
log3<number>(3)
// так мы переиспользуем одну функцию с разными типами используя generic

//----------===========-------------=============------
// типизировали и T и К

function log4<T, K>(obj: T, arr: K[]): K[] {
  // это уже 2 generics, получается комбинация разных типов
  console.log(obj)
  return arr
}

log4<string, number>('dw', [1])

//----------===========-------------=============------
//----------===========-------------=============------
interface HasLength {
  length: number
}

function log6<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  // это уже 2 generics, получается комбинация разных типов
  obj.length // и теперь можно обратиться к длине обьекта так как обьект явно имеет длину так как number
  console.log(obj)
  return arr
}

log6<string, number>('dw', [1])
//----------===========-------------=============------
//----------===========-------------=============------

interface IUser {
  name: string
  age?: number
  bid: <T>(sum: T) => boolean // функция бид , метод в классе, можно использовать generics
}

function bid<T>(sum: T): boolean {
  return true
}
//----------===========-------------=============------
