<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status}</title>
</svelte:head>

<div class="flex min-h-screen items-center bg-slate-200 dark:bg-slate-950">
	<div class="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
		<div class="mx-auto max-w-screen-sm text-center">
			<h1
				class="mb-4 text-7xl font-extrabold tracking-tight text-red-600 lg:text-9xl dark:text-red-500"
			>
				{page.status}
			</h1>

			{#if page.status === 404}
				<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Something's missing.
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					Sorry, we can't find that page. You'll find lots to explore on the home page.
				</p>
			{:else if page.status === 500}
				<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Internal Server Error.
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					We are already working to solve the problem.
				</p>
			{:else}
				<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Something went wrong.
				</p>
				<p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
					{page.error?.message || 'An unexpected error occurred.'}
				</p>
			{/if}

			<a
				href="/"
				class="my-4 inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:focus:ring-red-900"
			>
				Back to Homepage
			</a>
		</div>
	</div>
</div>
