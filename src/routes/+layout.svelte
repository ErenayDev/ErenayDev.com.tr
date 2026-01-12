<script lang="ts">
	import '../app.css';
	import BackgroundBeams from '$lib/components/effects/BackgroundBeams/BackgroundBeams.svelte';
	import { FloatingNavbar } from '$lib/components/layout/FloatingNavbar';
	import Footer from '$lib/components/layout/Footer';
	import PageLoader from '$lib/components/common/Loader/page-loader.svelte';
	import LoadingProvider from '$lib/components/common/Loader/LoadingProvider.svelte';
	import { IconBook2, IconCode, IconHome, IconMessageCircle } from '@tabler/icons-svelte';
	import { BackTop } from '$lib/components/layout/ScrollDown';
	import { browser } from '$app/environment';
	import { performance } from '$lib/stores/performance';
	import type { AnimationConfig } from '$lib/stores/performance';
	import { Toaster } from 'svelte-sonner';

	let animationConfig: AnimationConfig | null;

	if (browser) {
		performance.init();
		animationConfig = performance.getAnimationConfig();
		console.log(animationConfig, 'layout');
	}

	const navItems = [
		{ name: 'Home', link: '/', icon: IconHome, description: 'Home page' },
		{ name: 'Projects', link: '/#projects', icon: IconCode, description: 'Projects page' },
		{ name: 'Blog', link: '/blog', icon: IconBook2, description: 'Blog page' },
		{ name: 'Contact', link: '/#contactForm', icon: IconMessageCircle, description: 'Contact page' }
	];

	function handleHome() {
		const path = window.location.pathname;
		if (path === '/') {
			document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
		} else {
			window.location.href = '/';
		}
	}
	function handleProjects() {
		const path = window.location.pathname;
		if (path === '/') {
			document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
		} else {
			window.location.href = '/#projects';
		}
	}

	function handleContact() {
		const path = window.location.pathname;
		if (path === '/') {
			document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' });
		} else {
			window.location.href = '/#contactForm';
		}
	}
</script>

<svelte:head>
	{#if animationConfig?.enabled && animationConfig?.tier === 'H'}
		<script src="/live2d/autoload.js"></script>
	{/if}
</svelte:head>

<LoadingProvider>
	<div class="relative flex min-h-screen w-full flex-col items-center justify-center antialiased">
		<FloatingNavbar {navItems} {handleProjects} {handleContact} {handleHome} />

		{#if animationConfig?.enabled && animationConfig?.tier === 'H'}
			<div class="pointer-events-none absolute inset-0 z-11">
				<BackgroundBeams />
			</div>
		{/if}

		<main id="top">
			<slot {animationConfig} />
			<BackTop />
		</main>
	</div>
	<Footer />
	<PageLoader />
	<Toaster position="bottom-right" richColors />
</LoadingProvider>

<style>
	main {
		width: 100%;
		z-index: 10;
	}
</style>
