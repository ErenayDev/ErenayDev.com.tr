<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let scrollY = 0;
	let innerHeight = 0;

	const opacity = tweened(0, {
		duration: 300,
		easing: cubicOut
	});

	const translateY = tweened(20, {
		duration: 300,
		easing: cubicOut
	});

	$: if (scrollY > innerHeight * 0.1) {
		opacity.set(1);
		translateY.set(0);
	} else {
		opacity.set(0);
		translateY.set(20);
	}

	function handleClick() {
		document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div
	class="fixed right-5 bottom-5 z-11"
	on:click={handleClick}
	style="opacity: {$opacity}; transform: translateY({$translateY}px); pointer-events: {$opacity > 0
		? 'auto'
		: 'none'};"
>
	<button class="button">
		<svg class="svgIcon" viewBox="0 0 384 512">
			<path
				d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
			></path>
		</svg>
	</button>
</div>

<style>
	.button {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: oklch(12.9% 0.042 264.695);
		border: none;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
		cursor: pointer;
		transition-duration: 0.3s;
		overflow: hidden;
		position: relative;
	}

	.svgIcon {
		width: 12px;
		transition-duration: 0.3s;
	}

	.svgIcon path {
		fill: white;
	}

	.button:hover {
		width: 140px;
		border-radius: 50px;
		transition-duration: 0.3s;
		background-color: oklch(12.9% 0.042 264.695);
		align-items: center;
	}

	.button:hover .svgIcon {
		width: 20px;
		transition-duration: 0.3s;
		transform: translateY(-200%);
	}

	.button::before {
		position: absolute;
		bottom: -20px;
		content: 'Back to Top';
		color: white;
		/* transition-duration: .3s; */
		font-size: 0px;
	}

	.button:hover::before {
		font-size: 13px;
		opacity: 1;
		bottom: unset;
		/* transform: translateY(-30px); */
		transition-duration: 0.3s;
	}
</style>
