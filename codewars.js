// function multipleOfIndex(array) {
//   const arr = []

//   for (let i = 1; i < array.length; i++) {
//     if (array[i] % i === 0) {
//       arr.push(array[i])
//     }

//     console.log(arr)
//     return arr
//   }
// }

// multipleOfIndex([22, -6, 32, 82, 9, 25])

//Возвращает новый массив, состоящий из элементов, кратных своему индексу во входном массиве (длина > 1).
function multipleOfIndex(array) {
  let arr = []
  {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 'flick') {
        arr.push(false)
      }
      if (arr.includes(false)) arr.push(false)
      else {
        arr.push(true)
      }
    }
  }
  console.log(arr)
  return arr
}

multipleOfIndex(['bicycle', 'jarmony', 'flick', 'sheep', 'flick'])

// ['codewars', 'flick', 'code', 'wars'] ➞ [True, False, False, False]

// ['flick', 'chocolate', 'adventure', 'sunshine'] ➞ [False, False, False, False]

// ['bicycle', 'jarmony', 'flick', 'sheep', 'flick'] ➞ [True, True, False, False, True]
