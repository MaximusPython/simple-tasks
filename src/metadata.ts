import 'reflect-metadata'

function Injectable(key: string) {
  return (target: Function) => {
    Reflect.defineMetadata(key, 1, target)
    const meta = Reflect.getMetadata(key, target) // метадата дефайниться для определнного обьекта (для свойств , методов и тд)
    console.log(meta)
  }
}

function Prop(target: Object, name: string) {}

@Injectable('C')
export class C {
  @Prop prop: number
}

// @Injectable('D')
// export class D {
//   constructor(@Inject('C') c: C) {}
// }

// Конфигурация TypeScript: Необходимо включить поддержку декораторов и метаданных через tsconfig.json.
// Практическое использование: Показано, как метаданные используются для определения связей между классами и объектами.
// Часть 5: Получение типа данных в Runtime
// Информация о типах: С использованием метаданных можно получать информацию о типах данных даже после компиляции TypeScript в JavaScript.
// Пример: Демонстрация, как тип данных сохраняется и может быть извлечен через метаданные.
// Часть 6: Dependency Injection в действии
// Процесс DI: Объясняется процесс Dependency Injection, начиная от определения "инжектируемых" объектов до их использования в приложении.
// Связь с Reflect Metadata: Показывается, как метаданные используются для управления зависимостями и инъекций.
