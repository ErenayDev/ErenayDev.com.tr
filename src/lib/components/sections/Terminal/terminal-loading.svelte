<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { onDestroy } from 'svelte';
	import { useAnimation } from './terminal.svelte.js';
	import { fly } from 'svelte/transition';
	import type { TerminalLoadingProps } from './types';

	const frames = ['◒', '◐', '◓', '◑'];

	export let delay: number = 0;
	export let duration: number = 1000;
	let className: string | undefined = undefined;
	export { className as class };

	let playAnimation = false;
	let animationSpeed = 1;
	let frameIndex = 0;
	let complete = false;
	let interval: ReturnType<typeof setInterval>;
	let timeout: ReturnType<typeof setTimeout>;

	const play = (speed: number) => {
		playAnimation = true;
		animationSpeed = speed;
		interval = setInterval(nextFrame, 75 / animationSpeed);
		timeout = setTimeout(() => {
			complete = true;
			animation.callOnComplete();
		}, duration / animationSpeed);
	};

	const nextFrame = () => {
		if (frameIndex >= frames.length - 1) {
			frameIndex = 0;
			return;
		}
		frameIndex++;
	};

	$: flyDuration = 300 / animationSpeed;

	const animation = useAnimation({ delay, play });
	onDestroy(() => {
		animation.dispose();
		clearInterval(interval);
		clearTimeout(timeout);
	});
</script>

{#if playAnimation && !complete}
	<span class={cn('block', className)} in:fly={{ y: -5, duration: flyDuration }}>
		<span class="text-cyan-400">{frames[frameIndex]}</span>
		<slot name="loadingMessage" />
	</span>
{:else if playAnimation}
	<span class={cn('block', className)} data-completed in:fly={{ y: -5, duration: flyDuration }}>
		<slot name="completeMessage" />
	</span>
{/if}
