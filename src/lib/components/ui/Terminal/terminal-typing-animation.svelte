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
	let typingComplete = false;

	const play = (speed: number) => {
		playAnimation = true;
		animationSpeed = speed;
	};

	const handleTypingComplete = () => {
		typingComplete = true;
		// Typing tamamlandıktan sonra onComplete'i çağır
		setTimeout(() => {
			animation.callOnComplete();
		}, 100); // Küçük bir gecikme ekleyerek sonraki animasyonun başlamasını sağla
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
