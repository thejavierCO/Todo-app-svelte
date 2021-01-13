import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {Storage} from "./js/data3";

const app = new Storage();

app.push({
	title:"asdjioasd",
	description:"jaisdojiasd"
})

app.push({
	title:"asdjioasd",
	description:"jaisdojiasd"
})


console.log(app.get(1))

// const run = new App({
// 	target: document.querySelector("[app]"),
// 	props: {
//         app:new Storage()
// 	}
// });

// export default run;