<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';
	import { IconChevronLeft, IconChevronRight } from '@tabler/icons-svelte';

	export let imageArray;

	let vw,
		vh,
		divider,
		resizeObserver,
		captionHeight,
		currentActive,
		oldSlideCenter,
		sliderContainer;

	let currentIndex = 0,
		slideWidth = 0,
		movedBy = 0,
		startPos = 0,
		isDragging = false,
		dragStartTime = 0,
		rafId = null,
		lastMoveTime = 0,
		velocity = 0,
		lastPosition = 0,
		isAnimating = false,
		autoplayInterval = null,
		isAutoplayPaused = false;

	const MINIMUM_AMOUNT_OF_IMAGES = 2;
	const numberOfSlides = imageArray.length;
	const RAF_THROTTLE = 16.67;
	const DRAG_THRESHOLD = 0.3;
	const VELOCITY_THRESHOLD = 0.8;
	const MAX_DRAG_RATIO = 1.5;
	const AUTOPLAY_INTERVAL = 2000;

	const graph = (x) => -((x * x - 36) / 18) - 2;
	const derivation = (x) => -x / 9;
	const angle = (x) => (180 / Math.PI) * Math.atan(derivation(x));

	function startAutoplay() {
		if (autoplayInterval || isAutoplayPaused) return;
		autoplayInterval = setInterval(() => {
			if (!isDragging && !isAnimating) {
				updateCurrentIndex(1);
			}
		}, AUTOPLAY_INTERVAL);
	}

	function stopAutoplay() {
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
			autoplayInterval = null;
		}
	}

	function pauseAutoplay() {
		isAutoplayPaused = true;
		stopAutoplay();
	}

	function resumeAutoplay() {
		isAutoplayPaused = false;
		startAutoplay();
	}

	function setSliderPosition() {
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			const newOrderArray =
				currentIndex > 0
					? [
							...Array.from({ length: numberOfSlides - currentIndex }, (_, i) => currentIndex + i),
							...Array.from({ length: currentIndex }, (_, i) => i)
						]
					: Array.from({ length: numberOfSlides }, (_, i) => i);

			const medium = getMediumOfXAxis(imageArray);
			const slideCenter = (medium + currentIndex) % numberOfSlides;

			if (slideCenter !== oldSlideCenter) {
				flipBothEndsWithoutTransition(newOrderArray);
			}

			newOrderArray.forEach((slidenumber, index) => {
				const slide = imageArray[slidenumber].slide;
				if (!slide) return;

				const currentPositionOnXAxis = index - medium + 1;
				const dragOffset = (movedBy / slideWidth) * 0.9;
				const adjustedPosition = currentPositionOnXAxis + dragOffset;
				const { xpos, ypos, rotate } = calculateSlidePosition(adjustedPosition);

				slide.style.transform = `translate3d(${xpos}px, ${ypos}px, 0) rotate(${-rotate}deg)`;
			});

			oldSlideCenter = slideCenter;
			updateCaption((currentIndex + medium - 1) % numberOfSlides);
			rafId = null;
		});
	}

	function flipBothEndsWithoutTransition(array) {
		const firstItem = array[0];
		const lastItem = array[array.length - 1];
		const medium = getMediumOfXAxis(array);

		positionSlideWithoutTransition(imageArray[firstItem], array.length - 1);
		positionSlideWithoutTransition(imageArray[lastItem], -medium);

		function positionSlideWithoutTransition(currentSlide, newPosition) {
			if (!currentSlide?.slide) return;
			const slide = currentSlide.slide;

			slide.classList.add('notransition');
			slide.style.visibility = 'hidden';

			const { xpos, ypos, rotate } = calculateSlidePosition(newPosition);
			slide.style.transform = `translate3d(${xpos}px, ${ypos}px, 0) rotate(${-rotate}deg)`;

			// slide.offsetHeight();
			requestAnimationFrame(() => {
				slide.classList.remove('notransition');
				slide.style.visibility = 'visible';
			});
		}
	}

	function getMediumOfXAxis(array) {
		const len = array.length;
		return len % 2 === 0 ? Math.floor(len / 2) : Math.ceil(len / 2);
	}

	function calculateSlidePosition(xPosition) {
		const rotate = angle(xPosition);
		const xpos = xPosition * slideWidth * 0.9;
		const yCurve = graph(xPosition) * (vh / 1.5);
		const ypos = -yCurve;
		return { xpos, ypos, rotate };
	}

	function updateCurrentIndex(value) {
		if (isAnimating) return;
		isAnimating = true;
		currentIndex = (currentIndex + value + numberOfSlides) % numberOfSlides;
		setSliderPosition();
		setTimeout(() => {
			isAnimating = false;
		}, 150);
	}

	function grabStartHandler(event) {
		if (isAnimating) return;
		event.preventDefault();
		isDragging = true;
		startPos = getPositionX(event);
		lastPosition = startPos;
		movedBy = 0;
		velocity = 0;
		dragStartTime = Date.now();
		lastMoveTime = performance.now();
		pauseAutoplay();
	}

	function grabEndHandler() {
		if (!isDragging) return;
		const dragDuration = Date.now() - dragStartTime;
		let ratio = movedBy / slideWidth;
		isDragging = false;

		const hasSignificantVelocity = Math.abs(velocity) > VELOCITY_THRESHOLD;
		const hasSignificantDrag = Math.abs(ratio) >= DRAG_THRESHOLD;
		const hasMinimumDuration = dragDuration > 100;

		if ((hasSignificantVelocity || hasSignificantDrag) && hasMinimumDuration) {
			const direction = velocity !== 0 ? Math.sign(velocity) : Math.sign(ratio);
			updateCurrentIndex(-direction);
		} else {
			setSliderPosition();
		}

		movedBy = 0;
		resumeAutoplay();
	}

	function handleMove(event) {
		if (!isDragging) return;
		const now = performance.now();
		if (now - lastMoveTime < RAF_THROTTLE) return;

		const currentX = getPositionX(event);
		const deltaX = currentX - lastPosition;
		const deltaTime = now - lastMoveTime;
		velocity = deltaTime > 0 ? (deltaX / deltaTime) * 16.67 : 0;

		const rawMovedBy = currentX - startPos;
		const ratio = Math.abs(rawMovedBy / slideWidth);

		if (ratio <= MAX_DRAG_RATIO) {
			const resistance = ratio > 1 ? Math.pow(0.7, ratio - 1) : 1;
			movedBy = rawMovedBy * resistance * 0.95;
			setSliderPosition();
		}

		lastPosition = currentX;
		lastMoveTime = now;
	}

	function getPositionX(event) {
		return event.type.includes('mouse') ? event.pageX : event.touches?.[0]?.clientX || 0;
	}

	function updateCaption(nowInFocus) {
		if (nowInFocus !== currentActive) {
			currentActive = nowInFocus;
		}
	}

	function handlePrevious() {
		pauseAutoplay();
		updateCurrentIndex(-1);
	}

	function handleNext() {
		pauseAutoplay();
		updateCurrentIndex(1);
	}

	function handleImageClick(event, index) {
		const dragDuration = Date.now() - dragStartTime;
		if (!isDragging && dragDuration < 150) {
			window.open(imageArray[index].href, '_blank');
		}
	}

	function handleContainerMouseEnter() {
		pauseAutoplay();
	}

	function handleContainerMouseLeave() {
		if (!isDragging) {
			resumeAutoplay();
		}
	}

	onMount(() => {
		if (imageArray.length >= MINIMUM_AMOUNT_OF_IMAGES) {
			resizeObserver = new ResizeObserver((entries) => {
				const entry = entries[0];
				if (!entry) return;
				vw = entry.contentRect.width;
				vh = entry.contentRect.height;
				divider = vw >= 960 ? 2.3 : 1.4;
				slideWidth = vw / divider;
				setSliderPosition();
			});
			resizeObserver.observe(document.documentElement);
			startAutoplay();
		}
	});

	onDestroy(() => {
		resizeObserver?.unobserve(document.documentElement);
		stopAutoplay();
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	});
</script>

<section
	class="relative top-0 left-0 z-0 flex h-screen w-screen items-center justify-center overflow-hidden pb-4 transition-transform duration-500 ease-out"
	bind:clientWidth={vw}
	bind:clientHeight={vh}
	bind:this={sliderContainer}
	on:mouseenter={handleContainerMouseEnter}
	on:mouseleave={handleContainerMouseLeave}
	aria-label="Interactive image carousel - use arrow keys to navigate"
	aria-live="polite"
	aria-atomic="false"
	style="user-select: none; -webkit-user-select: none; touch-action: pan-y;"
>
	{#if imageArray.length >= MINIMUM_AMOUNT_OF_IMAGES}
		<button
			class="relative z-0 flex h-full w-full origin-center cursor-default items-center"
			aria-label="Draggable image carousel"
			tabindex="0"
			on:mousedown={grabStartHandler}
			on:mouseup={grabEndHandler}
			on:mousemove={handleMove}
		>
			<div class="absolute top-1/2 left-4 z-10000 -translate-y-1/2 scale-110">
				<button
					class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-black/50 text-white backdrop-blur-sm transition-all duration-200 ease-out hover:scale-110 hover:bg-black/70 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
					on:click={handlePrevious}
					aria-label="Previous image"
					disabled={isAnimating}
				>
					<IconChevronLeft size={24} />
				</button>
			</div>

			<div class="absolute top-1/2 right-4 z-10000 -translate-y-1/2 scale-110">
				<button
					class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-black/50 text-white backdrop-blur-sm transition-all duration-200 ease-out hover:scale-110 hover:bg-black/70 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
					on:click={handleNext}
					aria-label="Next image"
					disabled={isAnimating}
				>
					<IconChevronRight size={24} />
				</button>
			</div>

			{#each imageArray as image, index}
				<div
					class="notransition pointer-events-none absolute flex max-h-[85vh] w-screen origin-center justify-center p-4 transition-transform duration-300 ease-out will-change-transform"
					bind:this={imageArray[index].slide}
				>
					<div class="pointer-events-auto relative origin-center select-none">
						<button
							class="m-0 block border-none bg-transparent p-0"
							style="width: {slideWidth}px;"
							aria-label="Open {image.alt} in new tab"
							on:click={(e) => handleImageClick(e, index)}
							on:touchstart={grabStartHandler}
							on:touchend={grabEndHandler}
							on:touchmove={handleMove}
						>
							<img
								src={image.src}
								alt={image.alt}
								class="h-auto max-h-full w-auto max-w-full scale-100 transform-gpu cursor-grab rounded object-cover shadow-[5px_5px_50px_-1px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out backface-hidden {isDragging
									? 'cursor-grabbing transition-none'
									: ''}"
								on:dragstart|preventDefault
								draggable="false"
							/>
						</button>
					</div>
				</div>
			{/each}

			<div class="absolute bottom-8 left-0 h-30 w-full overflow-hidden">
				<div class="static flex h-full items-center justify-center">
					{#if currentActive || currentActive === 0}
						{#key currentActive}
							<a
								class="linkify absolute inline-block cursor-pointer rounded-xl px-3 py-1 text-center text-[clamp(1rem,1rem+2.2vw,2.6rem)] leading-[0.85] font-semibold no-underline backdrop-blur-sm transition-all duration-200 ease-out"
								href={imageArray[currentActive].href}
								target="_blank"
								rel="noopener noreferrer"
								bind:clientHeight={captionHeight}
								in:fly={{ y: captionHeight, duration: 300 }}
								out:fly={{ y: -captionHeight, duration: 300 }}
								aria-describedby="carousel-status"
							>
								{imageArray[currentActive].caption}
							</a>
						{/key}
					{/if}
				</div>
			</div>

			<div id="carousel-status" class="sr-only" aria-live="polite">
				Image {currentIndex + 1} of {numberOfSlides}
			</div>
		</button>
	{:else}
		<div class="mx-auto w-[85vw] max-w-150">
			<div
				class="rounded-lg border border-gray-200 bg-white p-8 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
			>
				<h2 class="m-0 mb-4 text-2xl text-red-700">Warning</h2>
				<p class="m-0 mb-6 leading-relaxed text-gray-600">
					Image Carousel only works with at least 5 pictures.
				</p>
				<ul class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-0">
					{#each imageArray as image}
						<li>
							<a
								href={image.href}
								target="_blank"
								rel="noopener noreferrer"
								class="block overflow-hidden rounded transition-transform duration-200 ease-out hover:scale-105"
							>
								<img
									src={image.src}
									alt={image.alt}
									class="h-20 w-full object-cover"
									on:dragstart|preventDefault
									draggable="false"
								/>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</section>

<style>
	.notransition {
		-webkit-transition: none !important;
		-moz-transition: none !important;
		-o-transition: none !important;
		transition: none !important;
	}

	.transform-gpu {
		transform: translateZ(0);
	}

	.backface-hidden {
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			transition-duration: 0.01ms !important;
			animation-duration: 0.01ms !important;
		}
	}
</style>
