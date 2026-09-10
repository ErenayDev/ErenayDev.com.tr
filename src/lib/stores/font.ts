import { writable } from 'svelte/store';

type FontKey = 'cascadia' | 'system' | /* 'sanfrancisco' |*/ 'golos' | 'sifonn';

const FONT_KEY = 'site:font';

const map: Record<FontKey, string> = {
	cascadia: "'Cascadia Code', system-ui, -apple-system, sans-serif",
	system: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
	// has been temporarily removed due to rendering
	// issues in some mobile device browsers
	// sanfrancisco:	"'SF Pro Display', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Helvetica Neue', Helvetica, Arial",
	golos: "'Golos Text', Georgia, 'Times New Roman', serif",
	sifonn: "'Sifonn', Georgia, 'Times New Roman', serif"
};

function getInitial(): FontKey {
	if (typeof window === 'undefined') return 'cascadia';
	const raw = localStorage.getItem(FONT_KEY) as FontKey | null;
	return raw && raw in map ? raw : 'cascadia';
}

function applyFont(key: FontKey) {
	if (typeof document === 'undefined') return;
	document.documentElement.style.setProperty('--font-sans', map[key]);
}

const store = writable<FontKey>(getInitial());

store.subscribe((value) => {
	if (typeof window === 'undefined') return;
	localStorage.setItem(FONT_KEY, value);
	applyFont(value);
});

export const font = store;
export function setFont(key: FontKey) {
	store.set(key);
}
export const fonts = [
	{ key: 'cascadia' as const, label: 'Cascadia Code (default)' },
	{ key: 'system' as const, label: 'System Font' },
	//	{ key: 'sanfrancisco' as const, label: 'San Francisco' },
	{ key: 'golos' as const, label: 'Golos Text' },
	{ key: 'sifonn' as const, label: 'Sifonn' }
];
