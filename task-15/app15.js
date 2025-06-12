const { performance, PerformanceObserver } = require('perf_hooks')

// Создаем наблюдателя
const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries()
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration} ms`)
  })
}) // Параметр: объект с настройками, где entryTypes — массив строк, определяющих типы записей, за которыми нужно следить
obs.observe({ entryTypes: ['measure'] }) // Созданный PerformanceObserver (obs) будет слушать все новые записи типа 'measure'.
//observe() — это способ подписаться на события производительности определенного типа, чтобы получать их в реальном времени и анализировать их.

// Создаем метки
performance.mark('start')
// Выполняем какую-то задачу
for (let i = 0; i < 1e6; i++) {}
performance.mark('end')

// Измеряем промежуток между метками
performance.measure('My Task', 'start', 'end')

// на выходе = My Task: 0.123 ms

// ==================================================================
// Что такое performance?
// performance — это объект, предоставляющий методы для измерения времени выполнения кода.

// Основные методы:
// performance.now() — возвращает высокоточное время в миллисекундах с точностью до микросекунд (используется для измерения интервалов).
// performance.mark(name) — создает метку времени с именем.
// performance.measure(name, startMark, endMark) — измеряет промежуток между двумя метками.
// performance.getEntriesByType(type) — возвращает список всех записей определенного типа (например, 'mark', 'measure').

// Что такое PerformanceObserver?
// PerformanceObserver — это класс, который позволяет слушать события о новых записях в объекте performance. Он помогает отслеживать и анализировать метрики в реальном времени.
// В чем его суть?
// Вы создаете экземпляр PerformanceObserver, передаете ему функцию-обработчик, которая вызывается при появлении новых записей. Затем регистрируетесь на определенные типы записей ('mark', 'measure', 'longtask', 'resource' и др.).

// getEntries() — это метод объекта Performance, который возвращает список всех записей о событиях производительности, зарегистрированных в объекте performance. Эти записи могут включать метки (mark),
//  измерения (measure), длительные задачи (longtask) и другие типы.
