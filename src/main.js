import "bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
// import App from './components/App.svelte';
// import {Storage as app} from "./js/data";
// import {UselocalStorage} from "./js/app";
// let test = new app(UselocalStorage);
import {StorageLocal as Storage} from "./js/data0"

let test = new Storage()

test.change((item,id)=>{
    console.log(item,id)
})

test.push(true);

let [str] = test.get(1);

str.change = (a,b,c)=>{
    console.log(a,b,c);
}

setInterval(()=>str.data = a=>!a,1000)

// const run = new App({
// 	target: document.querySelector("[app]"),
// 	props: {
//         app:test.get("tasks")
// 	}
// });

// export default run;