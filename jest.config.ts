import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	// импортируем конфиг из jest
	verbose: true, // берем эти свой-ства
	preset: 'ts-jest',
};

export default config;
