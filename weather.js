#!/ust/bin/env node
// данный текст означает что этот файл надо запускать через node

import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printHelp, printSuccess, printError } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    // если токен не передан (просто -t) раньше выводили true сейчас ошибку будем выводить
    printError('Не передан токен')
    return
  }
  try {
    // проверка на ошибки нашей функции сохранения токена и применение темы на успех и ошибку
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess(' Токен сохранен ')
  } catch (error) {
    printError(error.message)
  }
}
const initCLI = () => {
  const args = getArgs(process.argv) // args возвращает аргументы которые переданы
  //и возвращает результирующие обьект args с переданными значениями
  if (args.h) {
    printHelp()
  }
  if (args.t) {
    return saveToken(args.t) // в args.t будет лежать наш api ключ
    // после выполнения данной команды у нас в домашней директории компа появляется файл weather.js с обьектом {"token":"и то что написали"}%
  }
  getWeather('moscow')
}

initCLI()
