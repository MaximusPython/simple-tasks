// enum

type trend = 'left' | 'right'

enum Trend { // самая простая запись enum
  Left = 'left', // по умолчанию Left = 0 , Right = 1
  Right = 'right',
  Never = 2, // можно самому задавать числовое значение, можно один 0, другой строка
}

Trend.Left

enum Tred {
  L,
  R,
}

function move(tred: Tred) {
  // основное использование enum
  switch (tred) {
    case Tred.L:
      return -1
    case Tred.R:
      return 1
  }
}

/////
function objMod(obj: { Never: number }) {}

objMod(Trend) // в рантайме энумы ведут себя как обьекты, у Trend есть сво-во Never (стр 8)

////////////////////////////
const enum Trend2 {
  Up,
  Down,
}

let myTrend2 = Trend2.Up // в js myTrend2 будет просто 0, это фишка const enum
