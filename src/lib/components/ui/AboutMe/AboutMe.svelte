<script>
	import { Meteors } from '$lib/components/ui/Meteors';
	import { Motion } from 'svelte-motion';
	import items from './items.json';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="relative mt-16">
	<Motion
		initial={{ x: -100, opacity: 0 }}
		animate={{ x: 100, opacity: 1 }}
		transition={{ duration: 0.6 }}
		let:motion
	>
		<h2 use:motion class="mb-4 text-2xl font-bold md:text-7xl dark:text-white">
			I am Junior, <br />Full-Stack Developer
		</h2>
	</Motion>
	<div
		class="mx-8 grid grid-cols-1 items-stretch justify-center gap-8 px-4 sm:grid-cols-2 sm:gap-8 lg:mx-24 lg:grid-cols-3 lg:gap-8"
	>
		{#each items as item, index}
			<div class="animate-border-rotate bg-conic-border w-full rounded-lg p-px">
				<div class="relative h-full w-full overflow-hidden rounded-lg bg-gray-900 dark:bg-gray-900">
					<div
						class="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full blur-3xl"
					/>
					<div
						class="relative z-10 flex h-full min-h-fit flex-col items-start justify-start overflow-hidden rounded-lg border border-gray-200 bg-white px-3 py-6 shadow-xl sm:px-4 sm:py-8 dark:border-gray-800 dark:bg-gray-900"
					>
						<div
							class="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 dark:border-gray-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-2 w-2 text-gray-600 sm:h-3 sm:w-3 dark:text-gray-300"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
								/>
							</svg>
						</div>
						<h2
							class="relative z-50 mb-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white"
						>
							{item.title}
						</h2>
						<p
							class="relative z-50 mb-4 flex-1 text-sm font-normal text-gray-600 sm:text-base dark:text-slate-500"
						>
							{item.description}
						</p>
						<Button
							variant="outline"
							class="mt-auto cursor-pointer rounded-lg border border-gray-400 bg-gray-50 px-3 py-1 text-sm text-gray-700 transition-opacity duration-200 hover:opacity-80 sm:px-4 sm:py-1 sm:text-base dark:border-gray-500 dark:bg-transparent dark:text-gray-300"
						>
							{item.buttonText}
						</Button>
						<Meteors number={10} />
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
