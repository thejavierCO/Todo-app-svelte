import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
// import App from './components/App.svelte';
import {Store,Item} from "./js/data";

let data = new Store([]);

data.on("change",({detail})=>{
	console.log(detail)
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
			console.log(data.get(1))
		},3000)
	},3000)
},3000)

// const run = new App({
// 	target: document.querySelector("[app]"),
// 	props: {
// 		app:new app([])
// 	}
// });
