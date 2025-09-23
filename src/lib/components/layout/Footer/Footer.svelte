<script>
	import Copyright from 'svelte-copyright';
	import {
		IconBrandGithub,
		IconMail,
		IconBrandInstagram,
		IconBrandX,
		IconBrandMastodon
	} from '@tabler/icons-svelte';

	import { version } from '$app/environment';
</script>

<footer class="mt-16 border-t border-gray-200 py-6 dark:border-gray-700">
	<div class="container mx-auto px-4">
		<div
			class="grid grid-cols-2 gap-4 text-center text-sm text-gray-600 md:grid-cols-4 dark:text-gray-300"
		>
			<span class="flex items-center justify-center gap-1">
				Built with
				<a
					href="https://kit.svelte.dev/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
				>
					Svelte(Kit)
				</a>
			</span>
			<span class="flex items-center justify-center gap-1"> Coded with ❤️ </span>
			<span class="flex items-center justify-center gap-1">
				In
				<a
					href="https://zed.dev/"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
				>
					Zed editor
				</a>
			</span>
			<span class="flex items-center justify-center gap-1"> In Türkiye 🇹🇷 </span>
		</div>

		<div
			class="mt-6 flex flex-col items-center justify-center space-y-4 border-t border-gray-100 pt-4 dark:border-gray-800"
		>
			<div class="flex items-center space-x-4">
				<a
					href="mailto:erenaydev@proton.me"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out hover:bg-black text-black hover:text-white"
					aria-label="Email"
				>
					<IconMail size={20} data-cursor={false} />
				</a>
				<a
					href="https://github.com/ErenayDev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out hover:bg-black text-black hover:text-white"
					aria-label="GitHub"
				>
					<IconBrandGithub size={20} data-cursor={false} />
				</a>
				<a
					href="https://instagram.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out hover:bg-black text-black hover:text-white"
					aria-label="LinkedIn"
				>
					<IconBrandInstagram size={20} data-cursor={false} />
				</a>
				<a
					href="https://x.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out hover:bg-black text-black hover:text-white"
					aria-label="X (Formerly Twitter)"
				>
					<IconBrandX size={20} data-cursor={false} />
				</a>
				<a
					href="https://mastodon.social/@erenaydev"
					target="_blank"
					rel="noopener noreferrer me"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-all duration-300 ease-in-out hover:bg-black text-black hover:text-white"
					aria-label="Mastodon"
				>
					<IconBrandMastodon size={20} data-cursor={false} />
				</a>
			</div>

			<Copyright date={new Date()}>Erenay</Copyright>
			<span class="text-xs text-gray-500 dark:text-gray-400"> All rights reserved. v{version}</span>
		</div>
	</div>
</footer>
