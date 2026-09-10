import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createLoadingStore() {
	const { subscribe, set } = writable<boolean>(false);

	return {
		subscribe,
		setLoading: (loading: boolean) => set(loading),
		init: () => {
			if (browser) {
				set(false);
			}
		}
	};
}

export const loading = createLoadingStore();
