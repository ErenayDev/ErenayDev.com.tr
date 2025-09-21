/*
Installed from @ieedan/shadcn-svelte-extras
*/
import Root from './button.svelte';

import {
	buttonVariants,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	type AnchorElementProps,
	type ButtonElementProps
} from './button.svelte';

interface ButtonPropsWithoutHTML {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	onClickPromise?: (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => Promise<void>;
}

export {
	Root,
	Root as Button,
	buttonVariants,
	type ButtonProps,
	type ButtonProps as Props,
	type ButtonSize,
	type ButtonVariant,
	type AnchorElementProps,
	type ButtonElementProps,
	type ButtonPropsWithoutHTML
};
