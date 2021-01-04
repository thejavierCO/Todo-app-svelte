<script>
	import {writable} from "svelte/store";
	import Main from "./Main.svelte";
	import Task from "./task.svelte";
	export let app;
	// let Storage = writable(app,()=>{console.log("create update");return ()=>{console.log("exit")}});
	// let accions = {
	// 	get tasks(){
	// 		return app;
	// 	},
	// 	set tasks(data){
	// 		if(Array.isArray(data))app = data;
	// 	},
	// 	get task(){
	// 		return (id)=>app.filter(e=>e.id===id);
	// 	},
	// 	set task(data){
	// 		let {name,description} = data;
	// 		app.push({name,description,date:new Date(),id:app.length})
	// 		Storage.update(a=>app);
	// 	}
	// }
	let newTask = ({detail})=>accions.task = detail;
	let update = (tag)=>{
		// Storage.subscribe(e=>{
		// 	tag.innerHTML = "";
		// 	e.map(task =>new Task({
		// 		target:tag,
		// 		props:{
		// 			type:"print",
		// 			task
		// 		}
		// 	}));
		// });
	}
</script>
<Main>
	<div slot="navbar">
		<div class="container">
			<h3>Todo app</h3>
		</div>
	</div>
	<div slot="content" class="col">
		<div class="row render">
			<Task type="input" task={app} on:new={newTask}/>
		</div>
		<div class="row row-cols-4" use:update/>
	</div>
</Main>
