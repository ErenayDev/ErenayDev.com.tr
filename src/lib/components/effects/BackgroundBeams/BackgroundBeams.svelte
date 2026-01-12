<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { cn } from '$lib/utils/cn';

	export let className: string | undefined = undefined;

	interface Meteor {
		x: number;
		y: number;
		length: number;
		speed: number;
		opacity: number;
		angle: number;
		trail: Array<{ x: number; y: number; opacity: number }>;
	}

	class MeteorSystem {
		private canvas: HTMLCanvasElement;
		private ctx: CanvasRenderingContext2D;
		private meteors: Meteor[] = [];
		private animationId: number = 0;
		private lastTime: number = 0;
		private frameCount: number = 0;
		private fpsTime: number = 0;
		private currentFPS: number = 0;
		private resizeObserver: ResizeObserver | null = null;
		private isDestroyed: boolean = false;
		private fpsLogInterval: number = 0;

		constructor(canvas: HTMLCanvasElement) {
			this.canvas = canvas;
			this.ctx = canvas.getContext('2d')!;
			this.setupCanvas();
			this.initializeMeteors();
			this.startFPSLogging();
		}

		private setupCanvas(): void {
			const updateSize = () => {
				if (this.isDestroyed) return;

				const rect = this.canvas.getBoundingClientRect();
				const dpr = window.devicePixelRatio || 1;

				this.canvas.width = rect.width * dpr;
				this.canvas.height = rect.height * dpr;
				this.ctx.scale(dpr, dpr);
				this.canvas.style.width = rect.width + 'px';
				this.canvas.style.height = rect.height + 'px';

				this.reinitializeMeteors();
			};

			updateSize();

			this.resizeObserver = new ResizeObserver(() => {
				if (!this.isDestroyed) {
					updateSize();
				}
			});

			const observeTarget = this.canvas.parentElement || this.canvas;
			this.resizeObserver.observe(observeTarget);
		}

		private startFPSLogging(): void {
			this.fpsLogInterval = window.setInterval(() => {
				if (!this.isDestroyed) {
					console.log(`FPS: ${this.currentFPS}`);
				}
			}, 1000);
		}

		private initializeMeteors(): void {
			const meteorCount = 8;
			this.meteors = [];
			for (let i = 0; i < meteorCount; i++) {
				this.meteors.push(this.createMeteor());
			}
		}

		private reinitializeMeteors(): void {
			const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
			const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);

			this.meteors.forEach((meteor) => {
				if (meteor.x > canvasWidth || meteor.y > canvasHeight) {
					Object.assign(meteor, this.createMeteor());
				}
			});
		}

		private createMeteor(): Meteor {
			const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
			return {
				x: Math.random() * canvasWidth,
				y: -50,
				length: 100 + Math.random() * 100,
				speed: 2 + Math.random() * 3,
				opacity: 0.3 + Math.random() * 0.4,
				angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
				trail: []
			};
		}

		private updateMeteor(meteor: Meteor, deltaTime: number): void {
			const moveDistance = meteor.speed * deltaTime * 0.1;

			meteor.trail.unshift({
				x: meteor.x,
				y: meteor.y,
				opacity: meteor.opacity
			});

			if (meteor.trail.length > 20) {
				meteor.trail.pop();
			}

			meteor.x += Math.cos(meteor.angle) * moveDistance;
			meteor.y += Math.sin(meteor.angle) * moveDistance;

			const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
			const canvasHeight = this.canvas.height / (window.devicePixelRatio || 1);

			if (meteor.x > canvasWidth + 200 || meteor.y > canvasHeight + 200) {
				Object.assign(meteor, this.createMeteor());
			}
		}

		private drawMeteor(meteor: Meteor): void {
			this.ctx.save();

			const gradient = this.ctx.createLinearGradient(
				meteor.x,
				meteor.y,
				meteor.x - Math.cos(meteor.angle) * meteor.length,
				meteor.y - Math.sin(meteor.angle) * meteor.length
			);

			gradient.addColorStop(0, `rgba(24, 204, 252, ${meteor.opacity})`);
			gradient.addColorStop(0.3, `rgba(99, 68, 245, ${meteor.opacity * 0.8})`);
			gradient.addColorStop(1, `rgba(174, 72, 255, 0)`);

			this.ctx.strokeStyle = gradient;
			this.ctx.lineWidth = 2;
			this.ctx.lineCap = 'round';
			this.ctx.beginPath();
			this.ctx.moveTo(meteor.x, meteor.y);
			this.ctx.lineTo(
				meteor.x - Math.cos(meteor.angle) * meteor.length,
				meteor.y - Math.sin(meteor.angle) * meteor.length
			);
			this.ctx.stroke();

			meteor.trail.forEach((point, index) => {
				const trailOpacity = point.opacity * (1 - index / meteor.trail.length) * 0.5;
				this.ctx.fillStyle = `rgba(99, 68, 245, ${trailOpacity})`;
				this.ctx.beginPath();
				this.ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
				this.ctx.fill();
			});

			this.ctx.restore();
		}

		private updateFPS(currentTime: number): void {
			this.frameCount++;
			if (currentTime - this.fpsTime >= 1000) {
				this.currentFPS = Math.round((this.frameCount * 1000) / (currentTime - this.fpsTime));
				this.frameCount = 0;
				this.fpsTime = currentTime;
			}
		}

		private animate = (currentTime: number): void => {
			if (this.isDestroyed) return;

			const deltaTime = currentTime - this.lastTime;
			this.lastTime = currentTime;

			this.updateFPS(currentTime);

			const canvasWidth = this.canvas.width;
			const canvasHeight = this.canvas.height;

			this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

			this.meteors.forEach((meteor) => {
				this.updateMeteor(meteor, deltaTime);
				this.drawMeteor(meteor);
			});

			this.animationId = requestAnimationFrame(this.animate);
		};

		public start(): void {
			if (this.isDestroyed) return;
			this.lastTime = performance.now();
			this.fpsTime = this.lastTime;
			this.animate(this.lastTime);
		}

		public stop(): void {
			this.isDestroyed = true;

			if (this.animationId) {
				cancelAnimationFrame(this.animationId);
				this.animationId = 0;
			}

			if (this.resizeObserver) {
				this.resizeObserver.disconnect();
				this.resizeObserver = null;
			}

			if (this.fpsLogInterval) {
				clearInterval(this.fpsLogInterval);
				this.fpsLogInterval = 0;
			}

			this.meteors = [];
		}
	}

	let canvas: HTMLCanvasElement;
	let meteorSystem: MeteorSystem | null = null;

	onMount(() => {
		if (canvas) {
			meteorSystem = new MeteorSystem(canvas);
			meteorSystem.start();
		}
	});

	onDestroy(() => {
		if (meteorSystem) {
			meteorSystem.stop();
			meteorSystem = null;
		}
	});
</script>

<div class={cn('absolute inset-0 z-1 flex h-full w-full items-center justify-center', className)}>
	<canvas bind:this={canvas} class="pointer-events-none absolute z-0 h-full w-full" />
</div>
