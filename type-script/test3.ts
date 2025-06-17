// type coard = { lat: number; long: number }

// interface Icoard {
//   // интерфесы описывают только обьекты
//   lat: number
//   long: number
// }

// type ID = number | string // тайпы описывают еще и простые типы

// type myString = string // это будет просто string, смысла нет такой записи

// function compute(coard: Icoard) {}

// interface Animal {
//   name: string
// }

// interface Dog extends Animal {
//   // наследуемся от Animal
//   tail?: boolean
// }

// const doge: Dog = {
//   name: 'sdw',
// }
// //====================

// type AnimalType = {
//   name: string
// }

// type Dog2 = AnimalType & {
//   // cимвол & означает что мы обьединяем AnimalType и Dog2
//   tail?: boolean // в этом плане интерфейс удобнее extends
// }

// const dog: Dog = {
//   name: '',
//   tail: true,
// }
// //==================================

// interface Dog {
//   name: string
// }
// // в двух одинаковых интерфейсах проиходет соедининение двух свойств из интерфейсов, с тайпами так не получится

// interface Dog {
//   tail?: boolean
// }

// const dogi: Dog = {
//   name: 'dwdw',
//   tail: false,
// }
