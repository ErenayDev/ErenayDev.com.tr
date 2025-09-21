<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';
	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<div
	class={cn(
		'border-border bg-background aspect-video w-full rounded-lg border',
		className || undefined
	)}
>
	<div class="relative border-b border-inherit p-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				<div class="size-2 rounded-full bg-[#ef4444]"></div>
				<div class="size-2 rounded-full bg-[#eab308]"></div>
				<div class="size-2 rounded-full bg-[#22c55e]"></div>
			</div>
			<span class="absolute left-1/2 -translate-x-1/2 transform text-sm text-gray-400">
				erenay@cachyos-x8664
			</span>
		</div>
	</div>
	<div class="p-4">
		<slot />
	</div>
</div>
