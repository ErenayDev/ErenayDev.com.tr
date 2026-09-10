<script lang="ts">
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

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div
	class="scroll-to-top"
	role="button"
	tabindex={$opacity > 0 ? 0 : -1}
	aria-label="Scroll to top of page"
	on:click={handleClick}
	on:keydown={handleKeydown}
	style="opacity: {$opacity}; transform: translateY({$translateY}px); pointer-events: {$opacity > 0
		? 'auto'
		: 'none'};"
>
	<div class="button">
		<svg class="svgIcon" viewBox="0 0 384 512" aria-hidden="true">
			<path
				d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
			></path>
		</svg>
	</div>
</div>

<style>
	.scroll-to-top {
		position: fixed;
		right: 1.25rem;
		bottom: 1.25rem;
		z-index: 50;
		cursor: pointer;
		transition-duration: 0.3s;
		outline: none;
	}

	.scroll-to-top:focus-visible {
		outline: 2px solid oklch(70% 0.2 264.695);
		outline-offset: 2px;
	}

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
		transition-duration: 0.3s;
		overflow: hidden;
		position: relative;
		pointer-events: none;
	}

	.svgIcon {
		width: 12px;
		transition-duration: 0.3s;
	}

	.svgIcon path {
		fill: white;
	}

	.scroll-to-top:hover .button {
		width: 140px;
		border-radius: 50px;
		transition-duration: 0.3s;
		background-color: oklch(12.9% 0.042 264.695);
		align-items: center;
	}

	.scroll-to-top:hover .svgIcon {
		width: 20px;
		transition-duration: 0.3s;
		transform: translateY(-200%);
	}

	.button::before {
		position: absolute;
		bottom: -20px;
		content: 'Back to Top';
		color: white;
		font-size: 0px;
	}

	.scroll-to-top:hover .button::before {
		font-size: 13px;
		opacity: 1;
		bottom: unset;
		transition-duration: 0.3s;
	}
</style>
