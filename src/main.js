import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';

const run = new App({
	target: document.querySelector("[app]"),
	props: {}
});

export default run;