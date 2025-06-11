// классичекий традиционный замер функции

const start = performance.now() // время начала

let sum = 0
for (let i = 0; i < 222222; i++) {
  sum += i
}

const end = performance.now() // время конца
console.log(end - start)
