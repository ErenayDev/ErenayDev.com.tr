import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const theme = writable<boolean>(false);

if (browser) {
	const savedTheme = localStorage.getItem('theme');
	const isDark = savedTheme
		? savedTheme === 'dark'
		: window.matchMedia('(prefers-color-scheme: dark)').matches;
	theme.set(isDark);
	window.document.body.classList.toggle('dark', isDark);
}

export function toggleTheme() {
	if (browser) {
		theme.update((current) => {
			const newTheme = !current;
			window.document.body.classList.toggle('dark', newTheme);
			localStorage.setItem('theme', newTheme ? 'dark' : 'light');
			return newTheme;
		});
	}
}

export function getTheme() {
	if (browser) {
		return window.document.body.classList.contains('dark');
	}
	return false;
}
