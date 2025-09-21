import { clientLogger } from '$lib/logger/client';

window.addEventListener('error', (event) => {
	clientLogger.error(
		{
			message: event.message,
			filename: event.filename,
			lineno: event.lineno,
			colno: event.colno,
			stack: event.error?.stack
		},
		'Client-side error occurred'
	);
});

window.addEventListener('unhandledrejection', (event) => {
	clientLogger.error(
		{
			reason: event.reason,
			promise: event.promise
		},
		'Unhandled promise rejection'
	);
});
