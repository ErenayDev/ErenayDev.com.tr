<script lang="ts">
	import { cn } from '$lib/utils/cn';

	export let number: number | undefined = undefined;
	export let className: string | undefined = undefined;

	const meteors = new Array(number || 5).fill(true);
</script>

{#each meteors as meteor, idx (`meteor ${idx}`)}
	<span
		class={cn(
			'absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
			"before:absolute before:top-1/2 before:z-0 before:h-[1px] before:w-[50px] before:-translate-x-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-l before:from-[#64748b] before:to-transparent before:content-['']",
			className
		)}
		id={idx.toString()}
		style={`top: 0; left: ${Math.floor(Math.random() * (400 - -400) + -400) + 'px'}; animation: var(--animate-meteor-effect); animation-delay: ${Math.random() * (0.8 - 0.2) + 0.2 + 's'}; animation-duration: ${Math.floor(Math.random() * (10 - 2) + 2) + 's'}`}
	></span>
{/each}
