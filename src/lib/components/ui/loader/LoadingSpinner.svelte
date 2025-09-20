<script lang="ts">
	import { onMount } from 'svelte';

	export let boxColor = '#DCFFFF';
	export let shadowColor = '#dbe3f4';
	export let desktopSize = '128px';
	export let mobileSize = '80px';

	let isDesktop = false;
	let sizeValue: number;
	let sizeBoxes: number;
	let sizeMarginBottom: number;
	let rightColor: string;
	let leftColor: string;
	let containerStyle: string;
	let boxStyle: string;
	let faceStyles: {
		front: string;
		right: string;
		top: string;
		shadow: string;
	};

	const darkenColor = (color: string, amount: number) => {
		if (color === 'current') {
			return `color-mix(in srgb, var(--foreground) ${Math.round((1 - amount) * 100)}%, black)`;
		}
		const hex = color.replace('#', '');
		const num = parseInt(hex, 16);
		const r = Math.max(0, (num >> 16) - Math.round(255 * amount));
		const g = Math.max(0, ((num >> 8) & 0x00ff) - Math.round(255 * amount));
		const b = Math.max(0, (num & 0x0000ff) - Math.round(255 * amount));
		return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
	};

	const updateStyles = () => {
		sizeValue = isDesktop ? parseFloat(desktopSize) : parseFloat(mobileSize);
		sizeBoxes = (sizeValue * 32) / 64;
		sizeMarginBottom = (sizeValue * 50) / 64;
		rightColor = darkenColor(boxColor, 0.15);
		leftColor = darkenColor(boxColor, 0.05);

		containerStyle = `
    --size: ${sizeBoxes}px;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    margin-bottom: ${sizeMarginBottom}px;
  `;

		boxStyle = `
    width: var(--size);
    height: var(--size);
  `;

		faceStyles = {
			front: `
      background: ${boxColor === 'current' ? 'var(--foreground)' : boxColor};
      transform: translateZ(calc(var(--size) / 2));
    `,
			right: `
      background: ${rightColor};
      transform: rotateY(90deg) translateZ(calc(var(--size) / 2));
    `,
			top: `
      background: ${leftColor};
      transform: rotateX(-90deg) translateZ(calc(var(--size) / 2));
    `,
			shadow: `
      background: ${shadowColor};
      transform: translateZ(calc(var(--size) * -0.5));
    `
		};
	};

	onMount(() => {
		const checkDevice = () => {
			isDesktop = window.innerWidth >= 1024;
			updateStyles();
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);
		return () => window.removeEventListener('resize', checkDevice);
	});

	$: if (boxColor || shadowColor || desktopSize || mobileSize) {
		updateStyles();
	}
</script>

<div class="relative flex items-center justify-center">
	<div class="boxes-loader-container" style={containerStyle}>
		{#each [1, 2, 3, 4] as boxNum}
			<div class="boxes-loader-box boxes-loader-box-{boxNum}" style={boxStyle}>
				<div class="boxes-loader-face boxes-loader-face-front" style={faceStyles?.front} />
				<div class="boxes-loader-face boxes-loader-face-right" style={faceStyles?.right} />
				<div class="boxes-loader-face boxes-loader-face-top" style={faceStyles?.top} />
				<div class="boxes-loader-face boxes-loader-face-shadow" style={faceStyles?.shadow} />
			</div>
		{/each}
	</div>
</div>
