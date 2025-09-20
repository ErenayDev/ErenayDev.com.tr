<script lang="ts">
	import { setLoadingProvider } from '$lib/contexts/loading';
	import { onMount } from 'svelte';

	const { setPageLoading } = setLoadingProvider();

	onMount(() => {
		setPageLoading(true);

		const handleLoad = () => {
			setPageLoading(false);
		};

		if (document.readyState === 'complete') {
			setPageLoading(false);
		} else {
			window.addEventListener('load', handleLoad);
			return () => window.removeEventListener('load', handleLoad);
		}
	});
</script>

<slot />
