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
			sourcemap: false,
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('@tabler/icons-svelte')) return 'icons';
						if (id.includes('bits-ui')) return 'ui';
						if (
							id.includes('node_modules') &&
							(id.includes('clsx') || id.includes('tailwind-merge'))
						) {
							return 'utils';
						}
					}
				}
			}
		},
		server: {
			fs: {
				allow: ['..']
			}
		},
		experimental: {
			enableNativePlugin: true
		},
		esbuild: false
	};
});
