<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { onDestroy } from 'svelte';
	import { useAnimation } from './terminal.svelte.js';
	import { fly } from 'svelte/transition';

	export let delay: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	let playAnimation = false;
	let animationSpeed = 1;
	let completeTimeout: ReturnType<typeof setTimeout>;

	const play = (speed: number) => {
		playAnimation = true;
		animationSpeed = speed;
		completeTimeout = setTimeout(() => animation.callOnComplete?.(), duration);
	};

	$: duration = 300 / animationSpeed;

	const animation = useAnimation({ delay, play });
	onDestroy(() => {
		animation.dispose();
		clearTimeout(completeTimeout);
	});
</script>

{#if playAnimation}
	<span class={cn('block', className)} in:fly={{ y: -5, duration }}>
		<slot />
	</span>
{/if}
