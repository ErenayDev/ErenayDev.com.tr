<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let width: number = 800;
	export let height: number = 600;

	let canvas: HTMLCanvasElement;
	let gl: WebGLRenderingContext | null = null;
	let program: WebGLProgram | null = null;
	let animationId: number | null = null;
	let startTime: number | null = null;

	const vertexShaderSource: string = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

	const fragmentShaderSource: string = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;

    mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);

    mat2 mm2(float a) {
        float c = cos(a);
        float s = sin(a);
        return mat2(c, s, -s, c);
    }

    vec3 bg(vec3 rd) {
        float sd = (dot(vec3(-0.4195906817913055, -0.5035088062286377, 0.7552632093429565), rd) * 0.5) + 0.5;
        sd = pow(sd, 5.0);
        vec3 col = mix(vec3(0.05, 0.1, 0.2), vec3(0.1, 0.05, 0.2), vec3(sd));
        return col * 0.63;
    }

    float hash21(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float tri(float x) {
        return clamp(abs(fract(x) - 0.5), 0.01, 0.49);
    }

    vec2 tri2(vec2 p) {
        return vec2(tri(p.x) + tri(p.y), tri(p.y + tri(p.x)));
    }

    float triNoise2d(vec2 p, float spd) {
        float z = 1.8;
        float z2 = 2.5;
        float rz = 0.0;
        p *= mm2(p.x * 0.06);
        vec2 bp = p;
        for (float i = 0.0; i < 5.0; i += 1.0) {
            vec2 dg = tri2(bp * 1.85) * 0.75;
            dg *= mm2(iTime * spd);
            p -= (dg / z2);
            bp *= 1.3;
            z2 *= 0.45;
            z *= 0.42;
            p *= (1.21 + ((rz - 1.0) * 0.02));
            rz += (tri(p.x + tri(p.y)) * z);
            p *= -m2;
        }
        return clamp(1.0 / pow(rz * 29.0, 1.3), 0.0, 0.55);
    }

    vec4 aurora(vec3 ro, vec3 rd) {
        vec4 col = vec4(0.0);
        vec4 avgCol = vec4(0.0);
        for (float i = 0.0; i < 50.0; i += 1.0) {
            float of = (0.006 * hash21(gl_FragCoord.xy)) * smoothstep(0.0, 15.0, i);
            float pt = ((0.8 + (pow(i, 1.4) * 0.002)) - ro.y) / ((rd.y * 2.0) + 0.4);
            pt -= of;
            vec3 bpos = ro + (rd * pt);
            vec2 p = bpos.zx;
            float rzt = triNoise2d(p, 0.06);
            vec4 col2 = vec4(0.0, 0.0, 0.0, rzt);
            vec3 colorMod = ((sin(vec3(-1.15, 1.5, -0.2) + vec3(i * 0.043)) * 0.5) + vec3(0.5)) * rzt;
            col2 = vec4(colorMod, col2.w);
            avgCol = mix(avgCol, col2, 0.5);
            col += ((avgCol * exp2(((-i) * 0.065) - 2.5)) * smoothstep(0.0, 5.0, i));
        }
        col *= clamp((rd.y * 15.0) + 0.4, 0.0, 1.0);
        return col * 1.8;
    }

    vec3 hash33(vec3 p3) {
        p3 = fract(p3 * vec3(.1031, .1030, .0973));
        p3 += dot(p3, p3.yxz + 33.33);
        return fract((p3.xxy + p3.yxx) * p3.zyx);
    }

    vec3 stars(vec3 p) {
        vec3 c = vec3(0.0);
        float res = iResolution.x * 1.0;
        for (float i = 0.0; i < 4.0; i += 1.0) {
            vec3 q = fract(p * (0.15 * res)) - vec3(0.5);
            vec3 id = floor(p * (0.15 * res));
            vec2 rn = hash33(id).xy;
            float c2 = 1.0 - smoothstep(0.0, 0.6, length(q));
            c2 *= step(rn.x, 0.0005 + ((i * i) * 0.001));
            c += (((mix(vec3(1.0, 0.49, 0.1), vec3(0.75, 0.9, 1.0), rn.y) * 0.1) + vec3(0.9)) * c2);
            p *= 1.3;
        }
        return (c * c) * 0.8;
    }

    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 q = fragCoord / iResolution.xy;
        vec2 p = q - vec2(0.5);
        p.x *= (iResolution.x / iResolution.y);
        vec3 ro = vec3(0.0, 0.0, -6.7);
        vec3 rd = normalize(vec3(p, 1.3));

        // Automatic camera rotation based on time only
        rd.xz *= mm2(sin(iTime * 0.05) * 0.2);

        vec3 col = vec3(0.0);
        vec3 brd = rd;
        float fade = (smoothstep(0.0, 0.01, abs(brd.y)) * 0.1) + 0.9;
        col = bg(rd) * fade;

        if (rd.y > 0.0) {
            vec4 aur = smoothstep(vec4(0.0), vec4(1.5), aurora(ro, rd)) * fade;
            col += stars(rd);
            col = (col * (1.0 - aur.w)) + aur.xyz;
        } else {
            rd.y = abs(rd.y);
            col = (bg(rd) * fade) * 0.6;
            vec4 aur = smoothstep(vec4(0.0), vec4(2.5), aurora(ro, rd));
            col += (stars(rd) * 0.1);
            col = (col * (1.0 - aur.w)) + aur.xyz;
            vec3 pos = ro + (rd * ((0.5 - ro.y) / rd.y));
            float nz2 = triNoise2d(pos.xz * vec2(0.5, 0.7), 0.0);
            col += mix(vec3(0.016, 0.02, 0.04), vec3(0.21, 0.21, 0.35), vec3(nz2 * 0.4));
        }

        gl_FragColor = vec4(col, 1.0);
    }
  `;

	function createShader(
		gl: WebGLRenderingContext,
		type: number,
		source: string
	): WebGLShader | null {
		const shader: WebGLShader | null = gl.createShader(type);
		if (!shader) return null;

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error('Shader compile error:', gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}
		return shader;
	}

	function createProgram(
		gl: WebGLRenderingContext,
		vertexShader: WebGLShader,
		fragmentShader: WebGLShader
	): WebGLProgram | null {
		const program: WebGLProgram | null = gl.createProgram();
		if (!program) return null;

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Program link error:', gl.getProgramInfoLog(program));
			gl.deleteProgram(program);
			return null;
		}
		return program;
	}

	function initWebGL(): boolean {
		gl = canvas.getContext('webgl');
		if (!gl) {
			console.error('WebGL not supported');
			return false;
		}

		const vertexShader: WebGLShader | null = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader: WebGLShader | null = createShader(
			gl,
			gl.FRAGMENT_SHADER,
			fragmentShaderSource
		);

		if (!vertexShader || !fragmentShader) return false;

		program = createProgram(gl, vertexShader, fragmentShader);
		if (!program) return false;

		const positions: Float32Array = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

		const positionBuffer: WebGLBuffer | null = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

		const positionLocation: number = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(positionLocation);
		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

		return true;
	}

	function render(currentTime: number): void {
		if (!gl || !program) return;

		if (!startTime) startTime = currentTime;
		const time: number = (currentTime - startTime) * 0.001;

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.useProgram(program);

		const resolutionLocation: WebGLUniformLocation | null = gl.getUniformLocation(
			program,
			'iResolution'
		);
		const timeLocation: WebGLUniformLocation | null = gl.getUniformLocation(program, 'iTime');

		if (resolutionLocation) gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
		if (timeLocation) gl.uniform1f(timeLocation, time);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		animationId = requestAnimationFrame(render);
	}

	function handleResize(): void {
		if (canvas) {
			canvas.width = width;
			canvas.height = height;
		}
	}

	onMount(() => {
		handleResize();
		if (initWebGL()) {
			animationId = requestAnimationFrame(render);
		}
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
	});

	$: if (canvas) handleResize();
</script>

<canvas bind:this={canvas} {width} {height} style="display: block;" />

<style>
	canvas {
		border-radius: 4px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}
</style>
