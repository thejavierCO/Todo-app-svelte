import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {Storage} from "./js/todo"
import {App as app} from "./js/blockstack";

const run = new App({
	target: document.querySelector("[app]"),
	props: {
		app: new app("todo-app"),
		tasks:new Storage()
	}
});

export default run;