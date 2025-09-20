/* eslint-disable  @typescript-eslint/no-explicit-any */
import pino, { type LoggerOptions } from 'pino';
import { ServerEnvironment, type PinoLogger } from './interfaces';
import { env } from '$lib/env';
import { dev, building } from '$app/environment';
import { AxiomTransport } from './axiom-transport';

const defaultLogLevel = 'silent';

const createServerLogger = (): PinoLogger => {
	const pinoOptions: LoggerOptions = {
		level: defaultLogLevel,
		formatters: {
			level: (label) => {
				return { level: label.toUpperCase() };
			}
		}
	};

	let logger: PinoLogger;

	if (building) {
		// Minimal logger during build
		logger = pino({
			...pinoOptions,
			level: 'silent'
		}) as PinoLogger;
	} else if (!dev && env.AXIOM_DATASET && env.AXIOM_TOKEN) {
		// Production with Axiom
		const axiomTransport = new AxiomTransport(env.AXIOM_DATASET, env.AXIOM_TOKEN);

		logger = pino({
			...pinoOptions,
			write: (log: any) => {
				axiomTransport.write(log);
			}
		}) as PinoLogger;
	} else if (dev) {
		// Development with Axiom transport
		try {
			const transport = pino.transport({
				target: '@axiomhq/pino',
				options: {
					dataset: env.AXIOM_DATASET,
					token: env.AXIOM_TOKEN
				}
			});
			logger = pino(pinoOptions, transport) as PinoLogger;
		} catch (error) {
			console.error(error);
			logger = pino(pinoOptions) as PinoLogger;
		}
	} else {
		// Fallback console logger
		logger = pino(pinoOptions) as PinoLogger;
	}

	logger.setLogLevel = (NODE_ENV: ServerEnvironment) => {
		let logLevel: LoggerOptions['level'] = defaultLogLevel;

		switch (NODE_ENV) {
			case ServerEnvironment.DEV:
			case ServerEnvironment.PREV:
				logLevel = 'trace';
				break;
			case ServerEnvironment.STG:
			case ServerEnvironment.PROD:
				logLevel = 'info';
				break;
		}

		if (!building) {
			logger.info(`Server logger level set to "${logLevel}".`);
		}
		logger.level = logLevel;
		return logLevel;
	};

	return logger;
};

export const serverLogger = createServerLogger();
