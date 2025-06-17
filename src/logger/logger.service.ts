import { Logger } from 'tslog'

export class LoggerService {
  public logger: Logger<any>

  constructor() {
    this.logger = new Logger<any>({})
  }

  log(...args: unknown[]) {
    // unknown неизвестный передаваемый тип
    this.logger.info(...args)
  }
  error(...args: unknown[]) {
    this.logger.error(...args)
  }
  warn(...args: unknown[]) {
    this.logger.warn(...args)
  }
}
