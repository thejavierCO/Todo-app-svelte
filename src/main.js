import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {app} from "./js/app";

const run = new App({
	target: document.querySelector("[app]"),
	props: {
		app:[
			{
				name:"task1",
				description:"ajsiodjiaoisd",
				date:new Date(),
				id:0
			}
		]
	}
});

export default run;