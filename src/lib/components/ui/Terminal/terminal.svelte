<script lang="ts">
	import { Window } from '$lib/components/ui/window';
	import { cn } from '$lib/utils/cn';
	import { useTerminalRoot } from './terminal.svelte.js';
	import { onMount } from 'svelte';

	export let delay: number = 0;
	export let speed: number = 1;
	export let onComplete: () => void = () => {};
	let className: string | undefined = undefined;
	export { className as class };

	const terminal = useTerminalRoot({ delay, speed, onComplete });

	onMount(() => {
		// we play here so that we don't play before it is visible (on the server)
		terminal.play();
		return () => {
			terminal.dispose();
		};
	});
</script>

<Window class={cn('font-mono text-sm font-light', className)}>
	<slot />
</Window>
