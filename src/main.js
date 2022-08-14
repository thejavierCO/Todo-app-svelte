import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {TaskApp} from "./js/app";

let data = new TaskApp;

setInterval(()=>{
	data.add({
		id:Math.round(Math.random()*100)
	})
},2000)

data.on("change",(data)=>{
	console.log(data)
})

// const run = new App({
// 	target: document.querySelector("[app]"),
// 	props: {
// 		app:new app([])
// 	}
// });
