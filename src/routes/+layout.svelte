<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { BackgroundBeams } from '$lib/components/ui/BackgroundBeams';
	import { FloatingNavbar } from '$lib/components/ui/FloatingNavbar';
	import Footer from '$lib/components/ui/Footer';
	import PageLoader from '$lib/components/ui/loader/page-loader.svelte';
	import LoadingProvider from '$lib/components/ui/loader/LoadingProvider.svelte';
	import { IconBook2, IconCode, IconHome, IconMessageCircle } from '@tabler/icons-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { clientLogger } from '$lib/logger/client';
	import { BackTop } from '$lib/components/ui/ScrollDown';

	const navItems = [
		{ name: 'Home', link: '/', icon: IconHome, description: 'Home page' },
		{ name: 'Projects', link: '#projects', icon: IconCode, description: 'Projects page' },
		{ name: 'Blog', link: '/blog', icon: IconBook2, description: 'Blog page' },
		{ name: 'Contact', link: '#contact', icon: IconMessageCircle, description: 'Contact page' }
	];

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			clientLogger.info(
				{
					route: $page.route.id,
					url: $page.url.pathname,
					params: $page.params
				},
				`Page visited: ${$page.url.pathname}`
			);
		});

		return unsubscribe;
	});
</script>

<LoadingProvider>
	<div class="relative flex min-h-screen w-full flex-col items-center justify-center antialiased">
		<FloatingNavbar {navItems} />
		<div class="pointer-events-none absolute inset-0 z-11">
			<BackgroundBeams />
		</div>
		<main data-scroll-section id="top">
			<slot />
			<BackTop />
		</main>
	</div>
	<Footer />
	<PageLoader />
</LoadingProvider>

<style>
	main {
		width: 100%;
		z-index: 10;
	}
</style>
