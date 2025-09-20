import { type Logger, type LoggerOptions } from 'pino';

export enum ServerEnvironment {
	DEV = 'development',
	PREV = 'preview',
	STG = 'staging',
	PROD = 'production'
}

export type PinoLogger = Logger & {
	setLogLevel: (NODE_ENV: ServerEnvironment) => LoggerOptions['level'];
};
