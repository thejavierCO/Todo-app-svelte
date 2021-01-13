<script>
	import List from "./list.svelte";
	import {onMount} from "svelte";
	export let app;
	let data = [];
	let [change,update] = app.push([]);
	const add = ({target})=>{
		let title = target.querySelector("[title]").value
		let des = target.querySelector("[description]").value
		update(e=>{e.push({title,description:des});return e})
	}
</script>

<form on:submit|preventDefault={add}>
	<input type="text" placeholder="titulo" title/>
	<input type="text" placeholder="descripcion"  description/>
	<input type="submit" value="enviar">
</form>
<div class="list">
	<List storage={change}/>
</div>
