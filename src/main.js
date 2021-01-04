import App from './components/App.svelte';
import {app} from "./js/app";

const run = new App({
	target: document.querySelector("[app]"),
	props: {
		app:new app()
	}
});

export default run;