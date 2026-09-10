import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';

export type Timeout = ReturnType<typeof setTimeout> | undefined;

export type TerminalLoopProps = {
	onComplete: () => void;
};

export class TerminalLoop {
	constructor(readonly opts: TerminalLoopProps) {
		this.onComplete = this.onComplete.bind(this);
	}

	onComplete() {
		this.opts.onComplete();
	}
}

export type TerminalRootProps = {
	delay: number;
	speed: number;
	onComplete: () => void;
};

export class TerminalSession {
	#animations = writable<AnimationState[]>([]);
	#timeout: Timeout;

	constructor(
		readonly opts: TerminalRootProps,
		readonly loop?: TerminalLoop
	) {
		this.onComplete = this.onComplete.bind(this);
	}

	play() {
		this.#timeout = setTimeout(() => {
			this.#animations.update((animations) => {
				const sorted = [...animations].sort((a, b) => a.delay - b.delay);

				for (let i = 0; i < sorted.length; i++) {
					sorted[i].timeout = setTimeout(() => {
						sorted[i].play(this.opts.speed);
						// when the most delayed animation is complete call onComplete
						if (i === sorted.length - 1) {
							sorted[i].setOnComplete(this.onComplete);
						}
					}, sorted[i].delay);
				}

				return sorted;
			});
		}, this.opts.delay);
	}

	onComplete() {
		this.opts.onComplete?.();
		this.loop?.onComplete();
	}

	dispose() {
		clearTimeout(this.#timeout);
	}

	registerAnimation(animation: AnimationState) {
		this.#animations.update((animations) => [...animations, animation]);
	}
}

export type AnimationStateProps = {
	delay: number;
	play: (speed: number) => void;
};

export class AnimationState {
	delay: number;
	timeout: Timeout;
	#onComplete: (() => void) | undefined = undefined;

	constructor(
		readonly rootState: TerminalSession,
		readonly opts: AnimationStateProps
	) {
		this.delay = opts.delay;
		rootState.registerAnimation(this);
	}

	play(speed: number) {
		this.opts.play(speed);
	}

	setOnComplete(callback: (() => void) | undefined) {
		this.#onComplete = callback;
	}

	callOnComplete() {
		this.#onComplete?.();
	}

	dispose() {
		clearTimeout(this.timeout);
	}
}

const TERMINAL_LOOP_KEY = Symbol('Terminal.Loop');
const TERMINAL_ROOT_KEY = Symbol('Terminal.Root');

export const useTerminalLoop = (props: TerminalLoopProps) => {
	const loop = new TerminalLoop(props);
	setContext(TERMINAL_LOOP_KEY, loop);
	return loop;
};

export const useTerminalRoot = (props: TerminalRootProps) => {
	const loop = getContext<TerminalLoop>(TERMINAL_LOOP_KEY);
	const session = new TerminalSession(props, loop);
	setContext(TERMINAL_ROOT_KEY, session);
	return session;
};

export const useAnimation = (props: AnimationStateProps) => {
	const rootState = getContext<TerminalSession>(TERMINAL_ROOT_KEY);
	if (!rootState) {
		throw new Error('useAnimation must be used within a TerminalRoot');
	}
	return new AnimationState(rootState, props);
};
