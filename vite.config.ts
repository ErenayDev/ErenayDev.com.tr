import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';

/** @type import ('vite').UserConfig */
export default defineConfig(() => {
	const plugins = [
		tailwindcss(),
		sveltekit(),
		devtoolsJson({
			projectRoot: './src/'
		})
	];

	return {
		cache: true,
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
		}
	};
});
