import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {TaskApp as app} from "./js/app";

const run = new App({
	target: document.querySelector("[app]"),
	props: {
		app:new app([])
	}
});

export default run;