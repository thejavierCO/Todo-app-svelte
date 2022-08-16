import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {Store} from "./js/data";

const Storage = new Store();

Storage.use({
	store:"local"
})

new App({
	target:document.querySelector("[app]"),
	props:{
		app:Storage
	}
})
