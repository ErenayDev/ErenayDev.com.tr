import { browser } from '$app/environment';

export const logger = browser
	? (await import('./client')).clientLogger
	: (await import('./server')).serverLogger;
