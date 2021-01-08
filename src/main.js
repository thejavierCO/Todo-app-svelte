import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import App from './components/App.svelte';
import {UselocalStorage,App as app} from "./js/app";

// let test = new app(UselocalStorage)

// test.add("data",0)
// test.add("play",1)
// test.add("init",2)
// test.add("stack",3)



// console.log(test.get("data").value)

// setTimeout(()=>{test.put("data",e=>e+1)},1000)
// setTimeout(()=>{test.put("play",e=>e+1)},1000)
// setTimeout(()=>{test.put("init",e=>e+1)},1000)
// setTimeout(()=>{test.put("stack",e=>e+1)},1000)

const run = new App({
	target: document.querySelector("[app]"),
	props: {
		app:new app(UselocalStorage)
	}
});

export default run;