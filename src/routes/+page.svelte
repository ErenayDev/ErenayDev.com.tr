<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { onDestroy, onMount } from 'svelte';
	import { LampEffect } from '$lib/components/effects/LampEffect';
	import AboutMe from '$lib/components/sections/AboutMe';
	import Carousel from '$lib/components/widgets/Carousel';
	import { ContactForm } from '$lib/components/sections/Contact';
	import projects from './products.json';
	import SpiralArrow from '$lib/components/common/SpiralArrow.svelte';
	import { performance, type AnimationConfig } from '$lib/stores/performance';

	export let animationConfig: AnimationConfig | null = performance.getAnimationConfig();

	const pictureSliderArray = projects.map((project) => ({
		caption: project.title,
		alt: project.title,
		src: project.thumbnail,
		href: project.link,
		slide: null
	}));

	let titleInView = false;
	let svgInView = false;

	let titleTarget: HTMLElement;
	let svgTarget: HTMLElement;
	let observer: IntersectionObserver;

	$: canUseMotion =
		animationConfig?.enabled &&
		(animationConfig?.tier === 'H' ||
			animationConfig?.tier === 'M' ||
			animationConfig?.tier === 'L');

	$: canUseComplexAnimations = animationConfig?.enabled && animationConfig?.tier === 'H';

	$: shouldUseInViewAnimations =
		animationConfig?.enabled && (animationConfig?.tier === 'H' || animationConfig?.tier === 'M');

	onMount(() => {
		if (shouldUseInViewAnimations) {
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const target = entry.target;
						const isIntersecting = entry.isIntersecting;
						if (target === titleTarget) {
							titleInView = isIntersecting;
						} else if (target === svgTarget) {
							svgInView = isIntersecting;
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: '50px'
				}
			);

			setTimeout(() => {
				if (titleTarget) observer.observe(titleTarget);
				if (svgTarget) observer.observe(svgTarget);
			}, 100);
		} else if (canUseMotion) {
			titleInView = true;
			svgInView = true;
		}
	});

	onDestroy(() => {
		observer?.disconnect();
	});
</script>

<section>
	<LampEffect>
		{#if canUseMotion}
			<Motion
				let:motion
				initial={{ opacity: 0.5, y: 100 }}
				animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 100 }}
				transition={{
					delay: canUseComplexAnimations ? 0.3 : 0.1,
					duration: canUseComplexAnimations ? 0.8 : animationConfig?.tier === 'L' ? 0.2 : 0.4,
					ease: 'easeInOut'
				}}
			>
				<div class="pb-4" bind:this={titleTarget} use:motion>
					<h2 class="mt-8 p-4 text-center text-4xl font-medium md:text-7xl">
						<span class="hero-word hero-word--blue">Hello,</span>
						<span class="hero-word hero-word--amber">I'm</span>
						<br />
						<span class="hero-word hero-word--violet">Erenay ✨</span>
					</h2>
				</div>
			</Motion>

			{#if canUseComplexAnimations}
				<Motion
					let:motion
					initial={{ opacity: 0, x: 100 }}
					animate={svgInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
					transition={{
						delay: 0.5,
						duration: 0.8,
						ease: 'easeInOut'
					}}
				>
					<div
						bind:this={svgTarget}
						use:motion
						class="absolute top-1/2 bottom-9 left-120 hidden -translate-y-1/2 lg:block"
					>
						<SpiralArrow />
					</div>
				</Motion>
			{:else}
				<div
					bind:this={svgTarget}
					class="absolute top-1/2 bottom-9 left-120 hidden -translate-y-1/2 lg:block"
				>
					<SpiralArrow />
				</div>
			{/if}
		{:else}
			<div class="pb-4" bind:this={titleTarget}>
				<h2 class="mt-8 p-4 text-center text-4xl font-medium md:text-7xl">
					<span class="hero-word hero-word--blue">Hello,</span>
					<span class="hero-word hero-word--amber">I'm</span>
					<br />
					<span class="hero-word hero-word--violet">Erenay ✨</span>
				</h2>
			</div>
			<div
				bind:this={svgTarget}
				class="absolute top-1/2 bottom-9 left-120 hidden -translate-y-1/2 lg:block"
			>
				<SpiralArrow />
			</div>
		{/if}
	</LampEffect>
</section>

<section class="relative mt-24" id="projects">
	<div class="container">
		{#if canUseMotion}
			<Motion
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{
					duration: canUseComplexAnimations ? 0.6 : animationConfig?.tier === 'L' ? 0.2 : 0.3
				}}
				let:motion
			>
				<h2 use:motion class="text-2xl font-bold md:text-7xl dark:text-white">
					These are <br /> my projects
				</h2>
			</Motion>
			<Motion
				initial={{ x: -100, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{
					duration: canUseComplexAnimations ? 0.6 : animationConfig?.tier === 'L' ? 0.2 : 0.3,
					delay: canUseComplexAnimations ? 1 : animationConfig?.tier === 'L' ? 0.1 : 0.2
				}}
				let:motion
			>
				<p use:motion class="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
					I build beautiful products with the latest technologies and frameworks.
				</p>
			</Motion>
		{:else}
			<h2 class="text-2xl font-bold md:text-7xl dark:text-white">
				These are <br /> my projects
			</h2>
			<p class="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
				I build beautiful products with the latest technologies and frameworks.
			</p>
		{/if}
	</div>
	<Carousel imageArray={pictureSliderArray} />
</section>

<section class="mt-24">
	<AboutMe {animationConfig} />
</section>

<div id="contactForm">
	<ContactForm />
</div>
