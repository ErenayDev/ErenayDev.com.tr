<script lang="ts">
	import { Motion, AnimatePresence, useViewportScroll } from 'svelte-motion';
	import { cn } from '$lib/utils/cn';
	import type { ComponentType } from 'svelte';
	import { Button, DropdownMenu, Tooltip } from 'bits-ui';
	import { toast } from 'svelte-sonner';
	import {
		IconCaretRight,
		IconLetterCase,
		IconMoon,
		IconSettings,
		IconShadow,
		IconSun
	} from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import { font, setFont, fonts } from '$lib/stores/font';
	import { theme, toggleTheme } from '$lib/stores/theme';
	import { animations, performance } from '$lib/stores/performance';

	export let navItems: {
		name: string;
		link: string;
		description: string;
		icon?: ComponentType;
	}[];
	export let className: string | undefined = undefined;
	export let handleProjects: () => void;
	export let handleContact: () => void;
	export let handleHome: () => void;

	const { scrollYProgress } = useViewportScroll();
	let visible = false;
	let currentMode = performance.getCurrentMode();

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
		if (link === '/') {
			event.preventDefault();
			handleHome();
		}
		if (link === '/#projects') {
			event.preventDefault();
			handleProjects();
		}
		if (link === '/#contactForm') {
			event.preventDefault();
			handleContact();
		}
	}

	function handleAnimationChange(mode: 'auto' | 'high' | 'medium' | 'low') {
		performance.setPerformanceMode(mode);
		currentMode = mode;
		toast.error('You need to reload the web page to see the animation is changed', {
			action: {
				label: 'Reload',
				onClick: () => window.location.reload()
			}
		});
	}

	onMount(() => {
		const unsubscribeFont = font.subscribe(() => {});
		const unsubscribePerformance = performance.userPreference.subscribe((mode) => {
			currentMode = mode;
		});
		return () => {
			unsubscribeFont();
			unsubscribePerformance();
		};
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
				'fixed top-10 z-[5000] flex w-full items-center justify-center px-2 sm:px-4',
				className
			)}
		>
			<div
				class="flex max-w-full items-center justify-center space-x-1 overflow-hidden rounded-full border border-transparent bg-white px-2 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] sm:space-x-2 sm:px-4 dark:border-white/[0.2] dark:bg-black"
			>
				{#each navItems as navItem, idx (`link=${idx}`)}
					<Tooltip.Root group="navbar" openDelay={200} closeDelay={150}>
						<Tooltip.Trigger>
							<a
								href={navItem.link}
								on:click={(e) => handleNavClick(e, navItem.link)}
								class={cn(
									'relative flex items-center space-x-1 text-neutral-600 dark:text-neutral-300',
									'px-2 py-2 transition-all duration-200 hover:rounded-full hover:ring hover:ring-neutral-200 sm:px-3 hover:dark:text-white hover:dark:ring-white/[0.2]',
									'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100'
								)}
							>
								<svelte:component
									this={navItem.icon}
									class="block h-5 w-5 sm:hidden sm:h-6 sm:w-6"
								/>
								<span class="hidden text-xs sm:block sm:text-sm">{navItem.name}</span>
							</a>
						</Tooltip.Trigger>
						<Tooltip.Content
							side="bottom"
							class="z-[9998] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-md dark:border-gray-800 dark:bg-black dark:text-gray-100"
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
									'relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-neutral-600 select-none active:scale-[0.98] sm:h-10 sm:w-10 dark:text-neutral-300',
									'transition-all duration-200',
									'hover:ring hover:ring-neutral-200 dark:hover:ring-white/[0.2]',
									'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
									'hover:after:opacity-100'
								)}
								aria-label="Settings"
							>
								<IconSettings class="h-4 w-4 sm:h-6 sm:w-6" data-cursor={false} />
							</DropdownMenu.Trigger>
							<DropdownMenu.Content
								class="mobile-dropdown-left pointer-events-auto z-[9999] w-[180px] rounded-xl border border-gray-200 bg-white px-1 py-1.5 shadow-lg outline-hidden focus-visible:outline-hidden sm:w-[220px] dark:border-gray-800 dark:bg-black"
								sideOffset={8}
							>
								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger
										class={cn(
											'data-[highlighted]:bg-muted data-[state=open]:bg-muted relative flex h-10 items-center rounded-sm py-3 pr-1.5 pl-3 text-sm font-medium text-gray-900 !ring-0 !ring-transparent select-none dark:text-gray-100',
											'transition-all duration-200',
											'hover:bg-muted',
											'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
											'hover:after:opacity-100'
										)}
									>
										<div class="flex items-center">
											<IconLetterCase
												class="mr-2 size-4 text-gray-600 sm:size-5 dark:text-gray-400"
											/>
											<span class="text-xs sm:text-sm">Font</span>
										</div>
										<div class="ml-auto flex cursor-pointer items-center gap-px">
											<IconCaretRight class="size-4 text-gray-600 sm:size-5 dark:text-gray-400" />
										</div>
									</DropdownMenu.SubTrigger>
									<DropdownMenu.SubContent
										class="mobile-subdropdown-spacing w-full max-w-[200px] rounded-xl border border-gray-200 bg-white px-1 py-1.5 shadow-lg !ring-0 !ring-transparent sm:max-w-[240px] dark:border-gray-800 dark:bg-black"
										sideOffset={10}
									>
										{#each fonts as option}
											{#key option.key}
												<DropdownMenu.Item
													on:click={() => setFont(option.key)}
													class={cn(
														'relative flex h-10 items-center rounded-sm py-3 pr-1.5 pl-3 text-xs font-medium text-gray-900 transition-colors select-none focus-visible:outline-none sm:text-sm dark:text-gray-100',
														'transition-all duration-200',
														'hover:bg-muted',
														'after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
														'hover:after:opacity-100',
														$font === option.key ? 'bg-muted font-semibold' : 'cursor-pointer'
													)}
													aria-pressed={$font === option.key}
												>
													<span class="truncate">{option.label}</span>
													{#if $font === option.key}
														<span
															class="ml-auto inline-flex items-center rounded-md bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
														>
															Active
														</span>
													{/if}
												</DropdownMenu.Item>
											{/key}
										{/each}
									</DropdownMenu.SubContent>
								</DropdownMenu.Sub>

								<DropdownMenu.Separator class="my-1 h-px bg-gray-200 dark:bg-gray-700" />

								<DropdownMenu.Sub>
									<DropdownMenu.SubTrigger
										class={cn(
											'data-[highlighted]:bg-muted data-[state=open]:bg-muted relative flex h-10 items-center rounded-sm py-3 pr-1.5 pl-3 text-sm font-medium text-gray-900 !ring-0 !ring-transparent select-none dark:text-gray-100',
											'transition-all duration-200',
											'hover:bg-muted',
											'after:absolute after:inset-x-0 after:-bottom-px after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
											'hover:after:opacity-100'
										)}
									>
										<div class="flex items-center">
											<IconShadow class="mr-2 size-4 text-gray-600 sm:size-5 dark:text-gray-400" />
											<span class="text-xs sm:text-sm">Animations</span>
										</div>
										<div class="ml-auto flex cursor-pointer items-center gap-px">
											<IconCaretRight class="size-4 text-gray-600 sm:size-5 dark:text-gray-400" />
										</div>
									</DropdownMenu.SubTrigger>
									<DropdownMenu.SubContent
										class="mobile-subdropdown-spacing w-full max-w-[200px] rounded-xl border border-gray-200 bg-white px-1 py-1.5 shadow-lg !ring-0 !ring-transparent sm:max-w-[240px] dark:border-gray-800 dark:bg-black"
										sideOffset={10}
									>
										{#each animations as option}
											{#key option.key}
												<DropdownMenu.Item
													on:click={() => handleAnimationChange(option.key)}
													class={cn(
														'relative flex h-10 items-center rounded-sm py-3 pr-1.5 pl-3 text-xs font-medium text-gray-900 transition-colors select-none focus-visible:outline-none sm:text-sm dark:text-gray-100',
														'transition-all duration-200',
														'hover:bg-muted',
														'after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:h-px after:w-1/2 after:bg-gradient-to-r after:from-transparent after:via-blue-500 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300',
														'hover:after:opacity-100',
														currentMode === option.key ? 'bg-muted font-semibold' : 'cursor-pointer'
													)}
													aria-pressed={currentMode === option.key}
												>
													<span class="truncate">{option.label}</span>
													{#if currentMode === option.key}
														<span
															class="ml-auto inline-flex items-center rounded-md bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
														>
															Active
														</span>
													{/if}
												</DropdownMenu.Item>
											{/key}
										{/each}
									</DropdownMenu.SubContent>
								</DropdownMenu.Sub>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Tooltip.Trigger>
					<Tooltip.Content
						class="z-[9998] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-md dark:border-gray-800 dark:bg-black dark:text-gray-100"
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
								'relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium text-neutral-600 select-none active:scale-[0.98] sm:h-10 sm:w-10 dark:text-neutral-300',
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
								class="h-4 w-4 sm:h-6 sm:w-6"
							/>
						</Button.Root>
					</Tooltip.Trigger>
					<Tooltip.Content
						class="z-[9998] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-md dark:border-gray-800 dark:bg-black dark:text-gray-100"
						sideOffset={8}
						side="bottom"
					>
						{$theme ? 'Switch to light mode' : 'Switch to dark mode'}
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</div>
	</Motion>
</AnimatePresence>

<style>
	:global([data-selected]) {
		background: var(--muted);
		color: var(--foreground);
		font-weight: 600;
	}

	/* Bits UI scrollbar compensation'ı override et */
	:global(body) {
		padding-right: 0 !important;
	}

	/* Mobil için dropdown positioning */
	@media (max-width: 640px) {
		:global(.mobile-dropdown-left) {
			left: 8px !important;
			right: auto !important;
			transform: none !important;
		}

		:global(.mobile-subdropdown-spacing) {
			top: 100% !important;
			margin-top: 8px !important;
			left: 0 !important;
			right: auto !important;
			transform: none !important;
		}
	}
</style>
