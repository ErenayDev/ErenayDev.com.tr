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

			<form class="space-y-4">
				<Input type="email" value="" name="email" placeholder="Your email address" />
				<Input type="text" value="" name="subject" placeholder="Subject" />
				<Input
					type="textarea"
					value=""
					name="message"
					placeholder="What's on your mind?"
					class="h-24"
				/>
				<Button variant="cool" size="lg">Send Message</Button>
			</form>
		</div>

		<div
			class="flex flex-col items-center justify-center space-y-6 rounded-lg border border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
		>
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Connect With Me</h2>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<a
					href="mailto:erenaydev@proton.me"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
					aria-label="Email"
				>
					<IconMail size={20} />
				</a>

				<a
					href="https://github.com/ErenayDev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
					aria-label="GitHub"
				>
					<IconBrandGithub size={20} />
				</a>

				<a
					href="https://instagram.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
					aria-label="Instagram"
				>
					<IconBrandInstagram size={20} />
				</a>

				<a
					href="https://x.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
					aria-label="X (Formerly Twitter)"
				>
					<IconBrandX size={20} />
				</a>

				<a
					href="https://mastodon.social/@erenaydev"
					target="_blank"
					rel="noopener noreferrer me"
					class="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
					aria-label="Mastodon"
				>
					<IconBrandMastodon size={20} />
				</a>
			</div>

			<p class="text-center text-sm text-slate-600 dark:text-slate-400">
				Let's connect and build something amazing together!
			</p>
		</div>
	</div>
</div>
