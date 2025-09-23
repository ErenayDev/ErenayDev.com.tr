<script lang="ts">
	import { Motion, AnimatePresence, useViewportScroll } from 'svelte-motion';
	import { cn } from '$lib/utils/cn';
	import type { ComponentType } from 'svelte';
	import { Button, DropdownMenu, Tooltip } from 'bits-ui';
	import {
		IconCaretRight,
		IconLetterCase,
		IconMoon,
		IconSettings,
		IconSun
	} from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import { font, setFont, fonts } from '$lib/stores/font';
	import { theme, toggleTheme } from '$lib/stores/theme';

	export let navItems: {
		name: string;
		link: string;
		description: string;
		icon?: ComponentType;
	}[];
	export let className: string | undefined = undefined;
	export let handleProjects: () => void;
	export let handleContant: () => void;

	const { scrollYProgress } = useViewportScroll();
	let visible = false;

	$: updateDirection($scrollYProgress);

	function updateDirection(currentProgress: number) {
		const direction = currentProgress - scrollYProgress.getPrevious();

		if (scrollYProgress.get() < 0.05) {
			visible = true;
		} else {
			visible = direction < 0;
		}
	}

	function handleNavClick(event: MouseEvent, link: string) {
		if (link === '/#projects') {
			event.preventDefault();
			handleProjects();
		}
		if (link === '/#contactForm') {
			event.preventDefault();
			handleContant();
		}
	}

	onMount(() => {
		const unsubscribe = font.subscribe(() => {});
		return unsubscribe;
	});
</script>

<AnimatePresence show={true}>
	<Motion
		let:motion
		initial={{ opacity: 1, y: -100 }}
		animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
		transition={{ duration: 0.2 }}
	>
		<div
			use:motion
			class={cn(
				'dark:bg-background fixed inset-x-0 top-10 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white px-6 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2]',
				className
			)}
		>
			{#each navItems as navItem, idx (`link=${idx}`)}
				<Tooltip.Root group="navbar" openDelay={200} closeDelay={150}>
					<Tooltip.Trigger>
						<a
							href={navItem.link}
							on:click={(e) => handleNavClick(e, navItem.link)}
							class={cn(
								'text-foreground relative flex items-center space-x-1',
								'px-4 py-2 transition-all duration-200 hover:rounded-full hover:ring hover:ring-neutral-200 hover:dark:text-white hover:dark:ring-white/[0.2]',
								'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100'
							)}
						>
							<svelte:component
								this={navItem.icon}
								class="text-foreground block h-6 w-6 sm:hidden"
							/>
							<span class="hidden text-sm sm:block">{navItem.name}</span>
						</a>
					</Tooltip.Trigger>
					<Tooltip.Content
						side="bottom"
						class="bg-popover text-popover-foreground border-muted z-[9998] rounded-lg border px-3 py-2 text-sm shadow-md"
						sideOffset={8}
					>
						{navItem.description}
					</Tooltip.Content>
				</Tooltip.Root>
			{/each}

			<Tooltip.Root group="navbar" openDelay={200} closeDelay={150}>
				<Tooltip.Trigger>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger
							class={cn(
								'text-foreground shadow-btn relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium select-none active:scale-[0.98]',
								'transition-all duration-200',
								'hover:ring hover:ring-neutral-200 dark:hover:ring-white/[0.2]',
								'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
								'hover:after:opacity-100'
							)}
							aria-label="Settings"
						>
							<IconSettings class="text-foreground h-6 w-6" data-cursor={false} />
						</DropdownMenu.Trigger>
						<DropdownMenu.Content
							class="border-muted bg-background shadow-popover pointer-events-auto z-[9999] w-[220px] rounded-xl border px-1 py-1.5 outline-hidden focus-visible:outline-hidden"
							sideOffset={8}
						>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger
									class={cn(
										'data-[highlighted]:bg-muted data-[state=open]:bg-muted relative flex h-10 items-center rounded-sm py-3 pr-1.5 pl-3 text-sm font-medium !ring-0 !ring-transparent select-none',
										'transition-all duration-200',
										'hover:ring hover:ring-neutral-200 dark:hover:ring-white/[0.2]',
										'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
										'hover:after:opacity-100'
									)}
								>
									<div class="flex items-center">
										<IconLetterCase class="text-foreground-alt mr-2 size-5" /> Font
									</div>
									<div class="ml-auto flex cursor-pointer items-center gap-px">
										<IconCaretRight class="text-foreground-alt size-5" />
									</div>
								</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent
									class="border-muted bg-background shadow-popover w-full max-w-[260px] rounded-xl border px-1 py-1.5 !ring-0 !ring-transparent"
									sideOffset={10}
								>
									{#each fonts as option}
										{#key option.key}
											<DropdownMenu.Item
												on:click={() => setFont(option.key)}
												class={cn(
													'hover:bg-muted relative flex h-10 items-center rounded-sm py-3 pr-1.5 pl-3 text-sm font-medium transition-colors select-none focus-visible:outline-none',
													'transition-all duration-200',
													'hover:ring hover:ring-neutral-200 dark:hover:ring-white/[0.2]',
													'after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
													'hover:after:opacity-100',
													$font === option.key
														? 'bg-muted text-foreground font-semibold'
														: 'cursor-pointer'
												)}
												aria-pressed={$font === option.key}
											>
												<span class="truncate">{option.label}</span>
												{#if $font === option.key}
													<span
														class="bg-muted text-foreground ml-auto inline-flex items-center rounded-md px-2 py-0.5 text-xs"
													>
														Active
													</span>
												{/if}
											</DropdownMenu.Item>
										{/key}
									{/each}
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
							<DropdownMenu.Separator />
							<DropdownMenu.Item
								class={cn(
									'data-[highlighted]:bg-muted flex h-10 cursor-pointer items-center rounded-sm py-3 pr-1.5 pl-3 text-sm font-medium !ring-0 !ring-transparent select-none focus-visible:outline-none',
									'transition-all duration-200',
									'hover:ring hover:ring-neutral-200 dark:hover:ring-white/[0.2]',
									'after:absolute after:inset-x-0 after:bottom-1 after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
									'hover:after:opacity-100'
								)}
							>
								Another option
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Tooltip.Trigger>
				<Tooltip.Content
					class="bg-popover text-popover-foreground border-muted z-[9998] rounded-lg border px-3 py-2 text-sm shadow-md"
					sideOffset={8}
					side="bottom"
				>
					Settings and preferences
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root group="navbar" openDelay={200} closeDelay={150}>
				<Tooltip.Trigger>
					<Button.Root
						on:click={toggleTheme}
						class={cn(
							'text-foreground shadow-btn relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-medium select-none active:scale-[0.98]',
							'transition-all duration-200',
							'hover:ring hover:ring-neutral-200 dark:hover:ring-white/[0.2]',
							'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
							'hover:after:opacity-100'
						)}
						aria-label="Change Theme"
					>
						<svelte:component
							this={$theme ? IconMoon : IconSun}
							data-cursor={false}
							class="h-6 w-6"
						/>
					</Button.Root>
				</Tooltip.Trigger>
				<Tooltip.Content
					class="bg-popover text-popover-foreground border-muted z-[9998] rounded-lg border px-3 py-2 text-sm shadow-md"
					sideOffset={8}
					side="bottom"
				>
					{$theme ? 'Switch to light mode' : 'Switch to dark mode'}
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</Motion>
</AnimatePresence>

<style>
	:global([data-selected]) {
		background: var(--muted);
		color: var(--foreground);
		font-weight: 600;
	}
</style>
