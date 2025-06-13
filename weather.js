#!/ust/bin/env node
// данный текст означает что этот файл надо запускать через node

import { getArgs } from './helpers/args.js'

const initCLI = () => {
  const args = getArgs(process.argv) // args возвращает аргументы которые переданы
  console.log(args) //и возвращает результирующие обьект args с переданными значениями
}

initCLI()
