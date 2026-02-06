<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils/cn';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;
	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	export let ref: HTMLInputElement | null = null;
	export let value: string | number | undefined = undefined;
	export let type: Props['type'] = undefined;
	export let files: FileList | undefined = undefined;
	let className: string | undefined = undefined;
	export { className as class };

	$: restProps = (() => {
		const { ref: _, value: __, type: ___, files: ____, class: _____, ...rest } = $$props;
		return rest;
	})();

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = type?.match(/^(number|range)$/) ? +target.value : target.value;
	};
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			'dark:bg-input/30 selection:text-primary-foreground border-input placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else if type === 'textarea'}
	<textarea
		data-slot="textarea"
		class={cn(
			'dark:bg-input/30 selection:text-primary-foreground border-input placeholder:text-muted-foreground flex h-9 w-full min-w-0 resize-none rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			className
		)}
		bind:value
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		data-slot="input"
		class={cn(
			'border-input bg-background dark:bg-input/30 selection:text-primary-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			className
		)}
		{type}
		{value}
		on:input={handleInput}
		{...restProps}
	/>
{/if}
