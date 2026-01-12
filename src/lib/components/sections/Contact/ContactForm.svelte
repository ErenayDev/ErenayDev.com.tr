<script>
    import { Button } from '$lib/components/common/Button';
    import Input from '$lib/components/common/Input/input.svelte';
    import {
        IconBrandGithub,
        IconMail,
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
                <Button variant="cool" size="lg" disabled>Send Message</Button>
                <span>
                    Currently I didn&apos;t implement this feature. Contact me via email or social media.
                </span>
            </form>
        </div>
        <div
            class="flex flex-col items-center justify-center space-y-6 rounded-lg border border-slate-300 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
        >
            <h2 class="text-3xl font-bold text-slate-900 dark:text-white">Connect With Me</h2>
            <div class="flex flex-wrap items-center justify-center gap-4 text-white">
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
                    href="https://signal.me/#eu/WVEzZhk76QTwwvGgw3bcXtXGwkfp8tTn-WAPuY4-L4uqJnlF98tAKaSFRKWWcHnj"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-all duration-300 ease-in-out hover:bg-white hover:text-black"
                    aria-label="Signal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            d="M12 0q-.934 0-1.83.139l.17 1.111a11 11 0 0 1 3.32 0l.172-1.111A12 12 0 0 0 12 0M9.152.34A12 12 0 0 0 5.77 1.742l.584.961a10.8 10.8 0 0 1 3.066-1.27zm5.696 0-.268 1.094a10.8 10.8 0 0 1 3.066 1.27l.584-.962A12 12 0 0 0 14.848.34M12 2.25a9.75 9.75 0 0 0-8.539 14.459c.074.134.1.292.064.441l-1.013 4.338 4.338-1.013a.62.62 0 0 1 .441.064A9.7 9.7 0 0 0 12 21.75c5.385 0 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-7.092.068a12 12 0 0 0-2.59 2.59l.909.664a11 11 0 0 1 2.345-2.345zm14.184 0-.664.909a11 11 0 0 1 2.345 2.345l.909-.664a12 12 0 0 0-2.59-2.59M1.742 5.77A12 12 0 0 0 .34 9.152l1.094.268a10.8 10.8 0 0 1 1.269-3.066zm20.516 0-.961.584a10.8 10.8 0 0 1 1.27 3.066l1.093-.268a12 12 0 0 0-1.402-3.383M.138 10.168A12 12 0 0 0 0 12q0 .934.139 1.83l1.111-.17A11 11 0 0 1 1.125 12q0-.848.125-1.66zm23.723.002-1.111.17q.125.812.125 1.66c0 .848-.042 1.12-.125 1.66l1.111.172a12.1 12.1 0 0 0 0-3.662M1.434 14.58l-1.094.268a12 12 0 0 0 .96 2.591l-.265 1.14 1.096.255.36-1.539-.188-.365a10.8 10.8 0 0 1-.87-2.35m21.133 0a10.8 10.8 0 0 1-1.27 3.067l.962.584a12 12 0 0 0 1.402-3.383zm-1.793 3.848a11 11 0 0 1-2.345 2.345l.664.909a12 12 0 0 0 2.59-2.59zm-19.959 1.1L.357 21.48a1.8 1.8 0 0 0 2.162 2.161l1.954-.455-.256-1.095-1.953.455a.675.675 0 0 1-.81-.81l.454-1.954zm16.832 1.769a10.8 10.8 0 0 1-3.066 1.27l.268 1.093a12 12 0 0 0 3.382-1.402zm-10.94.213-1.54.36.256 1.095 1.139-.266c.814.415 1.683.74 2.591.961l.268-1.094a10.8 10.8 0 0 1-2.35-.869zm3.634 1.24-.172 1.111a12.1 12.1 0 0 0 3.662 0l-.17-1.111q-.812.125-1.66.125a11 11 0 0 1-1.66-.125"
                        />
                    </svg>
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
