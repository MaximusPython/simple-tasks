import { homedir } from 'os' // испортируем вывод домашней директории из библ os
import { join } from 'path' // join из библиотеки которая делает путь до нашего файла
import { promises } from 'fs' // чтобы записывать и читать файлы лучше использовать promises

// тут представлены функции по записываеию токена в файл и функция на получения ключа

const filePath = join(homedir(), 'weather.js') // это то где будет сохраняться  наш токен, данный файл появиться в нашей домашней директории с обьектом токена

const TOKEN_DICTIONARY = {
  // для лучшей записи создаем токен как объект
  token: 'token',
  city: 'city',
}

const saveKeyValue = async (key, value) => {
  // функция сохранения нашего файла ключ и значения
  let data = {}
  if (await isExist(filePath)) {
    // проверка на то что файл не пустой
    const file = await promises.readFile(filePath) // читаем файл
    data = JSON.parse(file) // переводим файл из строки json в обьект
  }

  data[key] = value // записываем значение в дату
  await promises.writeFile(filePath, JSON.stringify(data)) // будем сохранять ключ значение в наш файл по пути, данные для этого переводим в строку
}

const saveCityValue = async (key, value) => {
  let data = {}
  if (await isExist(filePath)) {
    // проверка на то что файл не пустой
    const file = await promises.readFile(filePath) // читаем файл
    data = JSON.parse(file) // переводим файл из строки json в обьект
  }

  data[key] = value // записываем значение в дату
  await promises.writeFile(filePath, JSON.stringify(data)) // будем сохранять ключ значение в наш файл по пути, данные для этого переводим в строку
}

const getKeyValue = async (key) => {
  // получения ключа
  if (await isExist(filePath)) {
    // проверка на то что файл не пустой
    const file = await promises.readFile(filePath)
    let data = JSON.parse(file)
    return data[key] // после того как файл распарсен возращаем ключ из него
  }
  return undefined
}

const isExist = async (path) => {
  // проверяем есть ли такой файл
  try {
    await promises.stat(path) // stat возвратит статистику файла
    return true
  } catch (e) {
    // если файла нет то false
    return false
  }
}

export { saveKeyValue, getKeyValue, saveCityValue, TOKEN_DICTIONARY }

// некоторые команды модуля path
// console.log(basename(filePath)) // basename выводит последнюю папку или файл
//   console.log(dirname(filePath)) // выведет путь где нахоится наш файл
//   console.log(extname(filePath)) // выведет расширение нашего файла
//   console.log(relative(filePath, dirname(filePath))) // relatie говорит какой путь нам нужно отностильно одного и второго
//   console.log(isAbsolute(filePath)) // проверяет абсолютный ли путь
//   console.log(resolve('..')) // можем сделать шаг назад от нашей текущей директории
//   console.log(sep) // можно посмотреть наш сепаратор например у нас он /
