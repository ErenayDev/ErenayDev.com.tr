<script lang="ts">
	import { onMount } from 'svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import { useLoading } from '$lib/contexts/loading';

	const { isLoading, setLoading } = useLoading();

	onMount(() => {
		const handleLoad = () => {
			setLoading(false);
		};

		if (document.readyState === 'complete') {
			setLoading(false);
		} else {
			window.addEventListener('load', handleLoad);
			return () => window.removeEventListener('load', handleLoad);
		}
	});
</script>

{#if $isLoading}
	<div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
		<LoadingSpinner desktopSize="128px" mobileSize="80px" />
	</div>
{/if}
