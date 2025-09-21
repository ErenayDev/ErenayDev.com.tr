<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { onDestroy } from 'svelte';
	import { useAnimation } from './terminal.svelte.js';
	import { typewriter } from '$lib/actions/typewriter.svelte';

	export let delay: number = 0;
	let className: string | undefined = undefined;
	export { className as class };

	let playAnimation = false;
	let animationSpeed = 1;

	const play = (speed: number) => {
		playAnimation = true;
		animationSpeed = speed;
	};

	const handleTypingComplete = () => {
		setTimeout(() => {
			animation.callOnComplete();
		}, 100);
	};

	const animation = useAnimation({ delay, play });

	onDestroy(() => animation.dispose());
</script>

{#if playAnimation}
	<span
		class={cn('block', className)}
		use:typewriter={{
			speed: animationSpeed * 2,
			onComplete: handleTypingComplete
		}}
	>
		<slot />
	</span>
{/if}
