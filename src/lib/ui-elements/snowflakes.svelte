<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationFrame: number;

	let width: number;
	let height: number;

	let snowflakes: Snowflake[] = [];
	let mouse = { x: -1000, y: -1000 }; // Initially far away

	interface Snowflake {
		x: number;
		y: number;
		radius: number;
		speed: number;
		opacity: number;
		vx: number;
		vy: number;
	}

	const SNOWFLAKE_COUNT = 200;

	function createSnowflakes(count: number) {
		snowflakes = Array.from({ length: count }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			radius: Math.random() * 3 + 1,
			speed: Math.random() * 1 + 0.5,
			opacity: Math.random() * 0.5 + 0.3,
			vx: 0,
			vy: 0
		}));
	}

	function updateSnowflakes() {
		for (const flake of snowflakes) {
			const dx = flake.x - mouse.x;
			const dy = flake.y - mouse.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			const minDist = 100;

			if (dist < minDist) {
				// Repulsion force
				const force = (minDist - dist) / minDist;
				const angle = Math.atan2(dy, dx);
				flake.vx += Math.cos(angle) * force;
				flake.vy += Math.sin(angle) * force;
			}

			// Gravity
			flake.vy += 0.01;

			// Apply velocity
			flake.x += flake.vx;
			flake.y += flake.vy;

			// Slow down over time (friction)
			flake.vx *= 0.98;
			flake.vy *= 0.98;

			// Wrap around bottom
			if (flake.y > height) {
				flake.y = -flake.radius;
				flake.x = Math.random() * width;
				flake.vy = 0;
			}
			if (flake.x < 0 || flake.x > width) {
				flake.x = Math.random() * width;
			}
		}
	}

	function drawSnowflakes() {
		ctx.clearRect(0, 0, width, height);
		for (const flake of snowflakes) {
			ctx.beginPath();
			ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
			ctx.fill();
		}
	}

	function animate() {
		updateSnowflakes();
		drawSnowflakes();
		animationFrame = requestAnimationFrame(animate);
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;

		createSnowflakes(SNOWFLAKE_COUNT);
		animate();

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		});

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', handleResize);
		};
	});

	function handleResize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		createSnowflakes(SNOWFLAKE_COUNT);
	}
</script>

<canvas bind:this={canvas} class="pointer-events-none fixed top-0 left-0 z-50 h-full w-full"
></canvas>
