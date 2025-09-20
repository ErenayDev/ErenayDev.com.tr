// src/lib/logger/client.ts
import pino, { type LoggerOptions } from 'pino';
import { ServerEnvironment, type PinoLogger } from './interfaces';

const defaultLogLevel = 'silent';

const createClientLogger = (): PinoLogger => {
	const pinoOptions: LoggerOptions = {
		browser: {
			asObject: false,
			write: {
				info: function (o) {
					console.info(o);
				},
				error: function (o) {
					console.error(o);
				},
				debug: function (o) {
					console.debug(o);
				},
				fatal: function (o) {
					console.error(o);
				},
				trace: function (o) {
					console.trace(o);
				},
				warn: function (o) {
					console.warn(o);
				}
			}
		},
		level: defaultLogLevel,
		formatters: {
			level: (label) => {
				return { level: label.toUpperCase() };
			}
		}
	};

	const logger = pino(pinoOptions) as PinoLogger;

	logger.setLogLevel = (NODE_ENV: ServerEnvironment) => {
		let logLevel: LoggerOptions['level'] = defaultLogLevel;

		switch (NODE_ENV) {
			case ServerEnvironment.DEV:
			case ServerEnvironment.PREV:
				logLevel = 'trace';
				break;
			case ServerEnvironment.STG:
				logLevel = 'info';
				break;
			case ServerEnvironment.PROD:
				logLevel = 'silent';
				break;
		}

		logger.info(`Client logger level set to "${logLevel}".`);
		logger.level = logLevel;
		return logLevel;
	};

	return logger;
};

export const clientLogger = createClientLogger();
