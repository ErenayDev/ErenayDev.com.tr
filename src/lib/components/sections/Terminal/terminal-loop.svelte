<script lang="ts">
	import { onDestroy } from 'svelte';
	import { useTerminalLoop } from './terminal.svelte.js';

	export let delay: number = 500;

	let loopIndex = 0;
	let loopDelayTimeout: ReturnType<typeof setTimeout>;

	const onComplete = () => {
		loopDelayTimeout = setTimeout(() => loopIndex++, delay);
	};

	useTerminalLoop({ onComplete });
	onDestroy(() => clearTimeout(loopDelayTimeout));
</script>

{#key loopIndex}
	<slot />
{/key}
