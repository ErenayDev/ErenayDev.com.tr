import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig(({ mode }) => {
	const plugins = [
		sveltekit(),
		tailwindcss(),
		devtoolsJson({
			projectRoot: './src/'
		})
	];

	if (mode === 'development') {
		import('vite-plugin-inspect')
			.then(({ default: inspect }) => {
				plugins.push(inspect());
			})
			.catch(() => {
				console.log('vite-plugin-inspect not available');
			});
	}

	if (mode === 'analyze') {
		import('vite-bundle-analyzer')
			.then(({ default: bundleAnalyzer }) => {
				plugins.push(bundleAnalyzer());
			})
			.catch(() => {
				console.log('vite-bundle-analyzer not available');
			});
	}

	return {
		plugins,

		optimizeDeps: {
			include: ['clsx', 'tailwind-merge', '@tabler/icons-svelte', 'bits-ui'],
			esbuildOptions: {
				target: 'es2020'
			}
		},

		build: {
			target: 'es2020',
			rollupOptions: {
				output: {
					manualChunks: {
						icons: ['@tabler/icons-svelte'],
						ui: ['bits-ui'],
						utils: ['clsx', 'tailwind-merge']
					}
				}
			}
		},

		server: {
			fs: {
				allow: ['..']
			}
		}
	};
});
