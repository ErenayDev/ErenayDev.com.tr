import { getContext, setContext } from 'svelte';
import { writable, derived, type Writable, type Readable } from 'svelte/store';

const CONTEXT_KEY = Symbol('loading-context');

interface LoadingContext {
	isLoading: Readable<boolean>;
	setLoading: (value: boolean) => void;
	setPageLoading: (value: boolean) => void;
}

export function setLoadingProvider() {
	const manualLoading: Writable<boolean> = writable(false);
	const pageLoading: Writable<boolean> = writable(true);

	const isLoading: Readable<boolean> = derived(
		[manualLoading, pageLoading],
		([$manualLoading, $pageLoading]) => $manualLoading || $pageLoading
	);

	const contextValue: LoadingContext = {
		isLoading,
		setLoading: manualLoading.set,
		setPageLoading: pageLoading.set
	};

	setContext(CONTEXT_KEY, contextValue);

	const result = { setPageLoading: pageLoading.set };

	return result;
}

export function useLoading(): LoadingContext {
	const context = getContext<LoadingContext>(CONTEXT_KEY);
	if (!context) {
		throw new Error('useLoading() must be used within a LoadingProvider');
	}
	return context;
}
