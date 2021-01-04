import App from './App.svelte';

const app = new App({
	target: document.querySelector("[app]"),
	props: {
		text:"hi!"
	}
});

export default app;