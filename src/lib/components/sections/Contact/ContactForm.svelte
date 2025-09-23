<script>
	import { Button } from '$lib/components/common/Button';
	import Input from '$lib/components/common/Input/input.svelte';
	import {
		IconBrandGithub,
		IconMail,
		IconBrandInstagram,
		IconBrandX,
		IconBrandMastodon
	} from '@tabler/icons-svelte';
</script>

<div
	class="container mx-auto flex w-full max-w-4xl flex-col items-center justify-center bg-slate-200 py-12 dark:bg-slate-950"
	id="contactForm"
>
	<div class="grid w-full grid-cols-1 gap-6 px-6 lg:grid-cols-2">
		<div
			class="flex flex-col space-y-6 rounded-lg border border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
		>
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Contact Me</h2>

			<form class="flex flex-col space-y-4">
				<Input type="email" value="" name="email" placeholder="Your email address" />
				<Input type="text" value="" name="subject" placeholder="Subject" />
				<Input
					type="textarea"
					value=""
					name="message"
					placeholder="What's on your mind?"
					resize={false}
				/>
				<button
					type="submit"
					class="focus-visible:ring-ring group relative flex h-9 w-full max-w-52 items-center justify-center gap-2 overflow-hidden rounded-md bg-black px-4 py-2 text-sm font-medium whitespace-pre text-white shadow transition-all duration-300 ease-out hover:bg-black/90 hover:ring-2 hover:ring-black hover:ring-offset-2 focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:flex"
				>
					<span
						class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
					></span>
					<span class="relative font-medium">Send Message</span>
				</button>
			</form>
		</div>

		<div
			class="flex flex-col items-center justify-center space-y-6 rounded-lg border border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
		>
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Connect With Me</h2>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<a
					href="mailto:erenaydev@proton.me"
					class="bg-slate-600 text-slate-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					aria-label="Email"
				>
					<IconMail size={24} />
				</a>

				<a
					href="https://github.com/ErenayDev"
					target="_blank"
					rel="noopener noreferrer"
					class="text-slate-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					aria-label="GitHub"
				>
					<IconBrandGithub size={24} />
				</a>

				<a
					href="https://instagram.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-pink-500 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-pink-500"
					aria-label="Instagram"
				>
					<IconBrandInstagram size={24} />
				</a>

				<a
					href="https://x.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-black hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-600"
					aria-label="X (Formerly Twitter)"
				>
					<IconBrandX size={24} />
				</a>

				<a
					href="https://mastodon.social/@erenaydev"
					target="_blank"
					rel="noopener noreferrer me"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-purple-600 hover:text-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-purple-600"
					aria-label="Mastodon"
				>
					<IconBrandMastodon size={24} />
				</a>
			</div>

			<p class="text-center text-sm text-slate-600 dark:text-slate-400">
				Let's connect and build something amazing together!
			</p>
		</div>
	</div>
</div>
