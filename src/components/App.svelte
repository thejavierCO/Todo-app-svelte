<script>
	import Main from "./Main.svelte";
	import Task from "./task.svelte";
	export let app;
	let newTask = ({detail})=>app.item = detail;
	let update = (tag)=>{
		app.update(e=>{
			tag.innerHTML = "";
			e.map(task =>new Task({
				target:tag,
				props:{
					type:"print",
					task
				}
			}));
		})
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
