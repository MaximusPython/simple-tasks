// работа с url и с querry параметрами

// import https from 'https' -- вместо это традиционнго способа будем использовать axios
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

import axios from 'axios'

const getWeather = async (city) => {
  // опишем метод получения погоды

  //   const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}` // такой url не совсем безопасный

  const token = await getKeyValue(TOKEN_DICTIONARY.token) // берем ключ токена

  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
  } // если токена нет, мы прочитали но он undefined то выдаем ошибку
  //   const url = new URL('https://api.openweathermap.org/data/2.5/weather') // теперь нам нужно передать параметры city key

  const { data } = await axios.get(
    // возращает axios responce c данными
    'https://api.openweathermap.org/data/2.5/weather',
    {
      // конструировать url не надо так как у axios есть доп опции среди которых есть params куда мы передаем наши querry
      params: {
        q: city,
        appid: token,
        lang: 'ru',
        units: 'metric', // axios удобнее и лаконичнее чем https
      },
    }
  )
  return data // выведет готовый обьект сразу а не json строку как у метода https

  // код ниже такой подход не испльзуется но для маленького проекта можно было бы
  //   url.searchParams.append('q', city)
  //   url.searchParams.append('appid', token)
  //   url.searchParams.append('lang', 'ru')
  //   url.searchParams.append('units', 'metric')

  //   // передаем наш сконфигурируемый url c query парамтерами и получаем responce на выходе
  //   https.get(url, (responce) => {
  //     let res = ''
  //     responce.on('data', (chunk) => {
  //       // подписывемся на получение данных , кусок данных называют chunk,
  //       res += chunk // как только его получили кладем его в res
  //     })
  //     responce.on('end', () => {
  //       // когда все завершили выводим наш результат
  //       console.log(res)
  //     })
  //   })
}

export { getWeather }
