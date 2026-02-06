<!-- not using anymore -->
<script lang="ts">
	export let products: {
		title: string;
		link: string;
		thumbnail: string;
	}[];

	import { Motion, useTransform, useSpring, useViewportScroll } from 'svelte-motion';
	import ProductCard from './ProductCard.svelte';

	const firstRow = products.slice(0, 5);
	const secondRow = products.slice(5, 10);
	const thirdRow = products.slice(10, 15);
	let ref: HTMLDivElement | null = null;

	const { scrollYProgress } = useViewportScroll();

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

	const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig
	);
	const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
	const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
	const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
</script>

<div
	bind:this={ref}
	class="perspective:1000px transform-style:preserve-3d relative flex flex-col self-auto overflow-hidden py-4 antialiased"
>
	<div class="container">
		<Motion
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.6 }}
			let:motion
		>
			<h2 use:motion class="text-2xl font-bold md:text-7xl dark:text-white">
				These are <br /> my projects
			</h2>
		</Motion>

		<Motion
			initial={{ x: -100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ duration: 0.6, delay: 1 }}
			let:motion
		>
			<p use:motion class="mt-8 max-w-2xl text-base md:text-xl dark:text-neutral-200">
				I build beautiful products with the latest technologies and frameworks.
			</p>
		</Motion>
	</div>
	<Motion
		let:motion
		style={{
			rotateX,
			rotateZ,
			opacity
		}}
	>
		<div use:motion class="mt-2">
			<Motion let:motion>
				<div use:motion class="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
					{#each firstRow as product (product.title)}
						<ProductCard {product} translate={translateX} />
					{/each}
				</div>
			</Motion>
			<Motion let:motion>
				<div use:motion class="mb-20 flex flex-row space-x-20">
					{#each secondRow as product (product.title)}
						<ProductCard {product} translate={translateXReverse} />
					{/each}
				</div>
			</Motion>
			<Motion let:motion>
				<div use:motion class="flex flex-row-reverse space-x-20 space-x-reverse">
					{#each thirdRow as product (product.title)}
						<ProductCard {product} translate={translateX} />
					{/each}
				</div>
			</Motion>
		</div>
	</Motion>
</div>
