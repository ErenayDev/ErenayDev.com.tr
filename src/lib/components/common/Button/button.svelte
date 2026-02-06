<script lang="ts" context="module">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: "overflow-hidden aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap outline-hidden transition-all select-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs',
				destructive:
					'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 text-white shadow-2xs',
				outline:
					'bg-background hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 border shadow-2xs',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-2xs',
				ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
				cool: 'flex items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out'
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export interface ButtonPropsWithoutHTML {
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
		onClickPromise?: (
			e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
		) => Promise<void>;
	}

	export interface AnchorElementProps
		extends ButtonPropsWithoutHTML, Omit<HTMLAnchorAttributes, 'href' | 'type'> {
		href: HTMLAnchorAttributes['href'];
		type?: never;
		disabled?: HTMLButtonAttributes['disabled'];
	}

	export interface ButtonElementProps
		extends ButtonPropsWithoutHTML, Omit<HTMLButtonAttributes, 'type' | 'href'> {
		type?: HTMLButtonAttributes['type'];
		href?: never;
		disabled?: HTMLButtonAttributes['disabled'];
	}

	export type ButtonProps = AnchorElementProps | ButtonElementProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { IconLoader2 } from '@tabler/icons-svelte';

	export let variant: ButtonVariant = 'default';
	export let size: ButtonSize = 'default';
	export let href: string | undefined = undefined;
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let tabindex: number = 0;
	export let onclick: ((e: Event) => void) | undefined = undefined;
	export let onClickPromise:
		| ((e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => Promise<void>)
		| undefined = undefined;

	let className: string = '';
	export { className as class };

	let ref: HTMLElement;
	let isLoading = false;

	$: isLoading = loading;

	async function handleClick(e: Event) {
		onclick?.(e);
		if (type === undefined) return;
		if (onClickPromise) {
			isLoading = true;
			await onClickPromise(e as MouseEvent & { currentTarget: EventTarget & HTMLButtonElement });
			isLoading = false;
		}
	}
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	data-slot="button"
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={href ? undefined : disabled || isLoading}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : tabindex}
	class={cn(
		variant === 'cool' ? '' : buttonVariants({ variant, size }),
		variant === 'cool' ? buttonVariants({ variant: 'cool', size: 'default' }) : '',
		className
	)}
	bind:this={ref}
	on:click={handleClick}
	{...$$restProps}
>
	{#if variant === 'cool'}
		<span
			class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
		></span>
	{/if}
	<slot />

	{#if type !== undefined && isLoading}
		<div class="absolute flex size-full place-items-center justify-center bg-inherit">
			<div class="flex animate-spin place-items-center justify-center">
				<IconLoader2 class="size-4" />
			</div>
		</div>
		<span class="sr-only">Loading</span>
	{/if}
</svelte:element>
