import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {App as app} from "./js/data.js"
import {UselocalStorage} from "./js/app";

const run = new App({
	target: document.querySelector("[app]"),
	props: {
		app:new app("task",(a)=>{
            console.log(a)
        },UselocalStorage)
	}
});

export default run;