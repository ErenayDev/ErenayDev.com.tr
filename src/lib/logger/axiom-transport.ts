/* eslint-disable  @typescript-eslint/no-explicit-any */
export class AxiomTransport {
	private dataset: string;
	private token: string;
	private buffer: any[] = [];
	private flushInterval: NodeJS.Timeout | null = null;

	constructor(dataset: string, token: string) {
		this.dataset = dataset;
		this.token = token;
		this.startFlushInterval();
	}

	write(log: any) {
		this.buffer.push({
			...log,
			timestamp: new Date().toISOString()
		});

		if (this.buffer.length >= 100) {
			this.flush();
		}
	}

	private async flush() {
		if (this.buffer.length === 0) return;

		const logs = [...this.buffer];
		this.buffer = [];

		try {
			await fetch(`https://api.axiom.co/v1/datasets/${this.dataset}/ingest`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${this.token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(logs)
			});
		} catch (error) {
			console.error('Failed to send logs to Axiom:', error);
			// Re-add logs to buffer for retry
			this.buffer.unshift(...logs);
		}
	}

	private startFlushInterval() {
		this.flushInterval = setInterval(() => {
			this.flush();
		}, 5000);
	}

	destroy() {
		if (this.flushInterval) {
			clearInterval(this.flushInterval);
		}
		this.flush();
	}
}
