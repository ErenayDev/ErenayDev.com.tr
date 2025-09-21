export type TerminalRootProps = {
	class?: string;
	delay?: number;
	speed?: number;
	onComplete?: () => void;
};

export type TerminalLoopProps = {
	delay?: number;
};

export type TerminalAnimationProps = {
	delay?: number;
	class?: string;
};

export type TerminalLoadingProps = Omit<TerminalAnimationProps, 'children'> & {
	duration?: number;
};
