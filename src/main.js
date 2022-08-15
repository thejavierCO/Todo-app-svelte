import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
// import App from './components/App.svelte';
import {Store} from "./js/data";

let dt = JSON.parse(localStorage.getItem("data"));
let data = new Store(dt);
data.on("change",(e)=>{
	localStorage.setItem("data",JSON.stringify(e.target.export()));
})

setTimeout(()=>{
	data.add({
		title:"asdioasd",
		description:"iasjdioasjidojaiosd"
	})
	setTimeout(()=>{
		data.add({
			title:"asdiasdasdsadoasd",
			description:"iasjdioasdasdasjidojaiosd"
		})
		setTimeout(()=>{
			console.log(data.export());
		},2000)
	},1000)
},1000)

// const run = new App({
// 	target: document.querySelector("[app]"),
// 	props: {
// 		app:new app([])
// 	}
// });
