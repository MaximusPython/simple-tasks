import { Logger } from 'tslog';
import { Ilogger } from './logger.interface';
import { injectable } from 'inversify';

@injectable() // это декаратор который говорит что этот класс теперь можно положить в контейнер
export class LoggerService implements Ilogger {
	public logger: Logger<any>;

	constructor() {
		this.logger = new Logger<any>({});
	}

	log(...args: unknown[]): void {
		// unknown неизвестный передаваемый тип
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
