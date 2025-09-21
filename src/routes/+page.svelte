<script lang="ts">
	import { Motion } from 'svelte-motion';
	import { onDestroy, onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import { LampEffect } from '$lib/components/effects/LampEffect';
	import AboutMe from '$lib/components/sections/AboutMe';
	import Carousel from '$lib/components/widgets/Carousel';
	import * as Terminal from '$lib/components/sections/Terminal';
	import { ContactForm } from '$lib/components/sections/Contact';
	import projects from './products.json';
	import SpiralArrow from '$lib/components/common/SpiralArrow.svelte';

	const pictureSliderArray = projects.map((project) => ({
		caption: project.title,
		alt: project.title,
		src: project.thumbnail,
		href: project.link,
		slide: null
	}));

	let titleInView = false;
	let svgInView = false;
	let terminalInView = false;
	let terminalMounted = false;

	let titleTarget: HTMLElement;
	let svgTarget: HTMLElement;
	let observer: IntersectionObserver;

	onMount(() => {
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

		if (titleTarget) observer.observe(titleTarget);
		if (svgTarget) observer.observe(svgTarget);
	});

	onDestroy(() => {
		observer?.disconnect();
	});
	function handleTerminalInView() {
		if (!terminalMounted) {
			terminalMounted = true;
			setTimeout(() => {
				terminalInView = true;
			}, 100);
		}
	}
	const terminalOptions = {
		threshold: 0.3
	};
</script>

<LampEffect>
	<Motion
		let:motion
		initial={{ opacity: 0.5, y: 100 }}
		animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 100 }}
		transition={{
			delay: 0.3,
			duration: 0.8,
			ease: 'easeInOut'
		}}
	>
		<div class="pb-4" bind:this={titleTarget} use:motion>
			<h2 class="mt-8 p-4 text-center text-4xl font-medium md:text-7xl" data-scroll>
				<span class="hero-word hero-word--blue">Hello,</span>
				<span class="hero-word hero-word--amber">I'm</span>
				<br />
				<span class="hero-word hero-word--violet">Erenay ✨</span>
			</h2>
		</div>
	</Motion>

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
</LampEffect>

<div class="relative" id="projects">
	<div class="container">
		<Motion
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.6 }}
			let:motion
		>
			<h2 use:motion class="text-2xl font-bold md:text-7xl dark:text-white">
				These are <br /> my projects
			</h2>
		</Motion>
		<Motion
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.6, delay: 1 }}
			let:motion
		>
			<p use:motion class="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
				I build beautiful products with the latest technologies and frameworks.
			</p>
		</Motion>
	</div>
	<Carousel imageArray={pictureSliderArray} />
</div>

<AboutMe />

<div
	class="flex min-h-screen items-center justify-center py-12"
	use:inview={terminalOptions}
	on:inview_enter={handleTerminalInView}
>
	{#if terminalInView}
		<Terminal.Root
			class="border-muted dark:border-muted w-full max-w-4xl bg-gray-600 text-white dark:bg-slate-950 "
			delay={250}
		>
			<Terminal.TypingAnimation>&gt; whoami</Terminal.TypingAnimation>
			<Terminal.AnimatedSpan delay={1500} class="text-blue-400">
				<span>erenay</span>
			</Terminal.AnimatedSpan>

			<Terminal.TypingAnimation delay={2500}>&gt; cat skills.json</Terminal.TypingAnimation>
			<Terminal.Loading delay={3500}></Terminal.Loading>
			<Terminal.AnimatedSpan delay={4750} class="font-mono whitespace-pre-line text-cyan-300">
				<span
					>{`{
  "frontend": ["Svelte/Kit", "React/Next.js", "TypeScript"],
  "backend": ["Node.js", "REST APIs", "Database Design"],
  "devops": ["Docker", "Server Deployment", "Linux Ecosystem"],
  "learning": ["Rust"],
  "tools": ["Git", "Zed", "Zsh / Bash"]
}`}</span
				>
			</Terminal.AnimatedSpan>

			<Terminal.TypingAnimation delay={6000}>&gt; npm run build-career</Terminal.TypingAnimation>
			<Terminal.Loading delay={7000}>
				<span slot="loadingMessage">Compiling experience</span>
				<span slot="completeMessage" class="text-green-500"> ✔ Career compiled successfully </span>
			</Terminal.Loading>
			<Terminal.AnimatedSpan delay={8250} class="text-yellow-400">
				<span>🚀 Ready to build amazing products with modern tech stack</span>
			</Terminal.AnimatedSpan>

			<Terminal.TypingAnimation delay={9250}>&gt; git status</Terminal.TypingAnimation>
			<Terminal.AnimatedSpan delay={10250} class="text-green-400">
				<span>On branch: main</span>
			</Terminal.AnimatedSpan>
			<Terminal.AnimatedSpan delay={10750} class="text-green-400">
				<span>Your branch is ahead of 'yesterday' by 1 commit</span>
			</Terminal.AnimatedSpan>
			<Terminal.AnimatedSpan delay={11250} class="text-white">
				<span> modified: skills.js</span>
			</Terminal.AnimatedSpan>
			<Terminal.AnimatedSpan delay={11750} class="text-white">
				<span> new file: awesome-project.svelte</span>
			</Terminal.AnimatedSpan>

			<Terminal.TypingAnimation delay={12500}>&gt; node echo.js</Terminal.TypingAnimation>
			<Terminal.Loading delay={15000} duration={500}></Terminal.Loading>
			<Terminal.AnimatedSpan delay={15500} class="text-purple-400">
				<span>Let's build something amazing together! 💫</span>
			</Terminal.AnimatedSpan>
		</Terminal.Root>
	{/if}
</div>
<ContactForm />
