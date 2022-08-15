import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
// import App from './components/App.svelte';
import {Store} from "./js/data";

const Storage = new Store();

Storage.use({
	store:"local",
	key:"data"
});

Storage.on("change",({detail:{item,add,del}})=>{
	console.log(add)
})

setInterval(()=>{
	Storage.add({
		title:"asdasdiasidasidsaida"+Math.round(Math.random()*100),
		description:"aisdjijasd asjdioajsiodjioa jsoid"
	});
},3000)

setTimeout(()=>{
	Storage.get(Math.round(Math.random()*(Storage.data.length-1))).data = {
		title:Math.round(Math.random()*100),
		description:Math.round(Math.random()*100)
	}
},3000)
