// здесь будем выводить нашу информацию в консоль, используем библиотеку chalk

import chalk from 'chalk' //библиотека для вывода цвета в консоль
import dedent from 'dedent-js' // библиотека для убирания лишних отступов

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ' + ' ' + error)) // передаем в нашу функцию наше сообщение текст будет красным
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ' + ' ' + message)) // передаем в нашу функцию наше сообщение текст будет зеленым
}

const printHelp = () => {
  // функция для вывода наших доступных команд
  console.log(dedent`${chalk.bgCyan(' HELP ')}
Без параметров - вывод погоды
-s [CITY] для установки города
-h для вывода помощи
-t [API_KEY] для сохранения токена`)
}

export { printError, printSuccess, printHelp }
