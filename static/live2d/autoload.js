/*!
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */

class Live2DAutoLoader {
	constructor(config = {}) {
		this.config = {
			basePath: '/live2d/',
			cdnPath: 'https://cdn.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.7/dist/',
			minScreenWidth: 768,
			enableMobile: false,
			logLevel: 'warn',
			...config
		};

		this.isLoaded = false;
		this.loadPromise = null;
	}

	async loadExternalResource(url, type) {
		return new Promise((resolve, reject) => {
			const existingElement = this.findExistingResource(url, type);
			if (existingElement) {
				resolve(url);
				return;
			}

			let element;

			if (type === 'css') {
				element = document.createElement('link');
				element.rel = 'stylesheet';
				element.href = url;
			} else if (type === 'js') {
				element = document.createElement('script');
				element.type = 'module';
				element.src = url;
			} else {
				reject(new Error(`Unsupported resource type: ${type}`));
				return;
			}

			element.onload = () => resolve(url);
			element.onerror = () => reject(new Error(`Failed to load ${type}: ${url}`));

			document.head.appendChild(element);
		});
	}

	findExistingResource(url, type) {
		const selector = type === 'css' ? `link[href="${url}"]` : `script[src="${url}"]`;
		return document.querySelector(selector);
	}

	shouldLoadOnCurrentDevice() {
		if (this.config.enableMobile) return true;
		return window.screen.width >= this.config.minScreenWidth;
	}

	configureCrossOriginImages() {
		const OriginalImage = window.Image;

		window.Image = function (...args) {
			const img = new OriginalImage(...args);
			img.crossOrigin = 'anonymous';
			return img;
		};

		window.Image.prototype = OriginalImage.prototype;
	}

	async loadDependencies() {
		const dependencies = [
			{ url: `${this.config.basePath}waifu.css`, type: 'css' },
			{ url: `${this.config.cdnPath}waifu-tips.js`, type: 'js' }
		];

		try {
			await Promise.all(dependencies.map((dep) => this.loadExternalResource(dep.url, dep.type)));
		} catch (error) {
			throw new Error(`Failed to load Live2D dependencies: ${error.message}`);
		}
	}

	getWidgetConfig() {
		return {
			waifuPath: `${this.config.basePath}waifu-tips.json`,
			cubism2Path: `${this.config.cdnPath}live2d.min.js`,
			cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',
			tools: ['switch-model', 'switch-texture', 'quit'],
			logLevel: this.config.logLevel,
			drag: false,
			...this.config.widgetOptions
		};
	}

	async initialize() {
		if (this.loadPromise) {
			return this.loadPromise;
		}

		this.loadPromise = this.performInitialization();
		return this.loadPromise;
	}

	async performInitialization() {
		try {
			if (!this.shouldLoadOnCurrentDevice()) {
				console.log('Live2D: Skipping initialization on current device');
				return false;
			}

			if (this.isLoaded) {
				console.log('Live2D: Already initialized');
				return true;
			}

			this.configureCrossOriginImages();
			await this.loadDependencies();

			if (typeof window.initWidget !== 'function') {
				throw new Error('initWidget function not available after loading dependencies');
			}

			window.initWidget(this.getWidgetConfig());
			this.isLoaded = true;

			this.displayBrandingMessage();
			return true;
		} catch (error) {
			console.error('Live2D initialization failed:', error);
			throw error;
		}
	}

	displayBrandingMessage() {
		console.log(
			`\n%cLive2D%cWidget%c\n`,
			'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;',
			'padding: 8px; background: #ff5450; font-size: large; color: #eee;',
			''
		);
	}

	static async autoLoad(config = {}) {
		const loader = new Live2DAutoLoader(config);
		return loader.initialize();
	}
}

// Auto-initialize with default configuration
(async () => {
	try {
		await Live2DAutoLoader.autoLoad();
	} catch (error) {
		console.error('Live2D auto-load failed:', error);
	}
})();

// Export for manual usage
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Live2DAutoLoader;
} else if (typeof window !== 'undefined') {
	window.Live2DAutoLoader = Live2DAutoLoader;
}
