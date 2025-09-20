<script>
	import { Meteors } from '$lib/components/ui/Meteors';
	import items from './items.json';
</script>

<div
	class="mx-8 lg:mx-24 grid grid-cols-1 items-center justify-center gap-4 px-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
>
	{#each items as item, index}
		<div class="animate-border-rotate bg-conic-border w-full max-w-sm rounded-lg p-px">
			<div class="relative w-full max-w-sm overflow-hidden rounded-lg bg-gray-900 dark:bg-gray-900">
				<div class="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full blur-3xl" />
				<div
					class="relative z-10 flex min-h-fit flex-col items-start justify-end overflow-hidden rounded-lg border border-gray-200 bg-white px-3 py-6 shadow-xl sm:px-4 sm:py-8 dark:border-gray-800 dark:bg-gray-900"
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
					<h2 class="relative z-50 mb-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
						{item.title}
					</h2>
					<p
						class="relative z-50 mb-4 text-sm font-normal text-gray-600 sm:text-base dark:text-slate-500"
					>
						{item.description}
					</p>
					<button
						class="cursor-pointer rounded-lg border border-gray-400 bg-gray-50 px-3 py-1 text-sm text-gray-700 transition-opacity duration-200 hover:opacity-80 sm:px-4 sm:py-1 sm:text-base dark:border-gray-500 dark:bg-transparent dark:text-gray-300"
					>
						{item.buttonText}
					</button>
					<Meteors number={10} />
				</div>
			</div>
		</div>
	{/each}
</div>
