<script>
	import { Button } from '$lib/components/common/Button';
	import Input from '$lib/components/common/Input/input.svelte';
	import { IconBrandGithub, IconMail, IconBrandX, IconBrandMastodon } from '@tabler/icons-svelte';
	import SignalIcon from '$lib/components/common/SignalIcon.svelte';
</script>

<div
	class="container mx-auto flex w-full max-w-4xl flex-col items-center justify-center bg-slate-200 py-8 dark:bg-slate-950"
	id="contactForm"
>
	<div class="grid w-full grid-cols-1 gap-8 px-8 lg:grid-cols-2">
		<div
			class="flex flex-col space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-slate-900"
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
				<Button variant="cool" size="lg" disabled>Send Message</Button>
				<span>
					Currently I didn&apos;t implement this feature. Contact me via email(recommended) or
					social media.
				</span>
			</form>
		</div>
		<div
			class="flex flex-col items-center justify-center space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-slate-900"
		>
			<h2 class="text-3xl font-bold text-slate-900 dark:text-white">Connect With Me</h2>
			<div class="flex flex-wrap items-center justify-center gap-4">
				<a href="mailto:erenaydev@proton.me" class="contactlink" aria-label="Email">
					<IconMail size={20} />
				</a>
				<a
					href="https://github.com/ErenayDev"
					target="_blank"
					rel="noopener noreferrer"
					class="contactlink"
					aria-label="GitHub"
				>
					<IconBrandGithub size={20} />
				</a>
				<a
					href="https://signal.me/#eu/WVEzZhk76QTwwvGgw3bcXtXGwkfp8tTn-WAPuY4-L4uqJnlF98tAKaSFRKWWcHnj"
					target="_blank"
					rel="noopener noreferrer"
					class="contactlink"
					aria-label="Signal"
				>
					<SignalIcon size={20} />
				</a>
				<a
					href="https://x.com/erenaydev"
					target="_blank"
					rel="noopener noreferrer"
					class="contactlink"
					aria-label="X (Formerly Twitter)"
				>
					<IconBrandX size={20} />
				</a>
				<a
					href="https://mastodon.social/@erenaydev"
					target="_blank"
					rel="noopener noreferrer me"
					class="contactlink"
					aria-label="Mastodon"
				>
					<IconBrandMastodon size={20} />
				</a>
			</div>
		</div>
	</div>
</div>
