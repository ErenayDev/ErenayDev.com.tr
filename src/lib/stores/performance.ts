import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { deviceTypeCapture } from '@techbana/device-type-capture';

type DevicePerformanceInfo = {
	tier: string;
	tierLevel: string;
	clientInfo: object;
	timestamp: number;
	tierDetails: {
		cpu: number;
		ram: number;
		connection: string | null;
		connectionRTT: number | null;
		connectionDownlink: number | null;
		saveDataMode: boolean | null;
	};
};

type AnimationConfig = {
	tier: 'H' | 'M' | 'L';
	enabled: boolean;
};

type PerformanceMode = 'auto' | 'high' | 'medium' | 'low';

function createPerformanceStore() {
	const { subscribe, set } = writable<DevicePerformanceInfo | null>(null);
	const userPreference = writable<PerformanceMode>('auto');

	if (browser) {
		const saved = localStorage.getItem('performance-preference');
		if (saved && ['auto', 'high', 'medium', 'low'].includes(saved)) {
			userPreference.set(saved as PerformanceMode);
		}
	}

	const animationConfig = derived(
		[{ subscribe }, userPreference],
		([$performance, $userPreference]): AnimationConfig | null => {
			if ($userPreference !== 'auto') {
				const tierMap: Record<PerformanceMode, 'H' | 'M' | 'L'> = {
					auto: 'M',
					high: 'H',
					medium: 'M',
					low: 'L'
				};
				return {
					enabled: $userPreference !== 'low',
					tier: tierMap[$userPreference]
				};
			}

			if (!$performance) {
				return {
					enabled: true,
					tier: 'M'
				};
			}

			return {
				enabled: $performance.tierLevel !== 'L',
				tier: $performance.tierLevel as 'H' | 'M' | 'L'
			};
		}
	);

	return {
		subscribe,
		animationConfig,
		userPreference: {
			subscribe: userPreference.subscribe,
			set: (mode: PerformanceMode) => {
				userPreference.set(mode);
				if (browser) {
					localStorage.setItem('performance-preference', mode);
				}
			}
		},
		setPerformance: (performanceInfo: DevicePerformanceInfo) => set(performanceInfo),
		init: () => {
			if (browser) {
				const performanceData = deviceTypeCapture();
				set(performanceData);
			}
		},
		getAnimationConfig: (): AnimationConfig | null => {
			const value = get({ subscribe });
			const preference = get(userPreference);

			if (preference !== 'auto') {
				const tierMap: Record<PerformanceMode, 'H' | 'M' | 'L'> = {
					auto: 'M',
					high: 'H',
					medium: 'M',
					low: 'L'
				};
				return {
					enabled: preference !== 'low',
					tier: tierMap[preference]
				};
			}

			if (!value) {
				return {
					enabled: true,
					tier: 'M'
				};
			}

			return {
				enabled: value.tierLevel !== 'L',
				tier: value.tierLevel as 'H' | 'M' | 'L'
			};
		},
		setPerformanceMode: (mode: PerformanceMode) => {
			userPreference.set(mode);
			if (browser) {
				localStorage.setItem('performance-preference', mode);
			}
		},
		getCurrentMode: (): PerformanceMode => {
			return get(userPreference);
		}
	};
}

export const performance = createPerformanceStore();
export type { AnimationConfig, PerformanceMode };

export const animations = [
	{ key: 'auto' as const, label: 'Auto' },
	{ key: 'low' as const, label: 'Low' },
	{ key: 'medium' as const, label: 'Medium' },
	{ key: 'high' as const, label: 'High (not recommended)' }
];
