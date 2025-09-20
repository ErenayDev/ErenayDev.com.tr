// src/hooks.server.ts
import { serverLogger } from '$lib/logger/server';
import { ServerEnvironment } from '$lib/logger/interfaces';
import type { Handle } from '@sveltejs/kit';
import { env } from '$lib/env';

serverLogger.setLogLevel(env.PUBLIC_NODE_ENV as ServerEnvironment);

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const start = Date.now();
		const ip = event.getClientAddress() || 'unknown';
		serverLogger.info(
			{
				method: event.request.method,
				url: event.url.pathname,
				userAgent: event.request.headers.get('user-agent'),
				ip
			},
			`${event.request.method} ${event.url.pathname}`
		);

		const response = await resolve(event);

		const duration = Date.now() - start;

		serverLogger.info(
			{
				method: event.request.method,
				url: event.url.pathname,
				status: response.status,
				duration: `${duration}ms`
			},
			`${event.request.method} ${event.url.pathname} - ${response.status} (${duration}ms)`
		);

		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
