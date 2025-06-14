#!/ust/bin/env node
// данный текст означает что этот файл надо запускать через node

import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js'

import {
  saveKeyValue,
  saveCityValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from './services/storage.service.js'

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

const saveCity = async (city) => {
  if (!city.length) {
    // функция сохранения города
    printError('Не передан город')
    return
  }
  try {
    await saveCityValue(TOKEN_DICTIONARY.city, city)
    printSuccess(' Город сохранен ')
  } catch (error) {
    printError(error.message)
  }
}

const getForcast = async () => {
  // получение города
  try {
    // TOKEN =2F22 CITY=moscow node weather.js
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city)) //  либо process.env.CITY либо город возьмем из токена
    const weather = await getWeather(city) // передаем город в нашу функцию
    printWeather(weather, getIcon(weather.weather[0].icon))
    // res будет наш weather , 'иконка'
  } catch (e) {
    //обрабатвываем ошибки через try cath и красиво их выводим ошибки могут быть через 404 и 401
    if (e?.response?.status == 404) {
      // / так как наш getWeather работает с axios то ошибка будет от него в response и ее нужно обработать
      printError('Неверно указан город')
    } else if (e?.response?.status == 401) {
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
}
const initCLI = () => {
  const args = getArgs(process.argv) // args возвращает аргументы которые переданы
  //и возвращает результирующие обьект args с переданными значениями

  //console.log(process.env) // выводим переменные окружения нашей операц системы // так можно задавать такие переменные TOKEN=DDWDWD2E node weather.js, но они не долго там пробудут, это используется для отладки

  if (args.h) {
    return printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  } // сохранение города

  if (args.t) {
    return saveToken(args.t) // в args.t будет лежать наш api ключ
    // после выполнения данной команды у нас в домашней директории компа появляется файл weather.js с обьектом {"token":"и то что написали"}%
  }
  return getForcast()
}
initCLI()
