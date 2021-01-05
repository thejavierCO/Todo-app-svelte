<script>
	import Main from "./Main.svelte";
	import Task from "./task.svelte";
	export let app;
	let newTask = ({detail})=>app.item = detail;
	let edit = ({detail:a})=>{
		let {parent} = a;
		let controlId = document.querySelector("#newTask").querySelector(".idNewTask");
		let controlName = document.querySelector("#newTask").querySelector(".nameNewTask");
		let controlDescription = document.querySelector("#newTask").querySelector(".descriptionNewTask");
		let id = parent.getAttribute("task");
		let name = parent.querySelector(".name").textContent;
		let description = parent.querySelector(".description").textContent;
		id = parseInt(id);
		controlId.value = id;
		controlName.value = name;
		controlDescription.value = description
	}
	let delTask = ({detail:a})=>{
		let {parent} = a;
		let id = parent.getAttribute("task");
		id = parseInt(id);
		app.data = app.data.filter(e=>e.id!==id);
	}
	let update = (tag)=>{
		app.data.map(task=>new Task({
			target:tag,
			props:{
				type:"print",
				task
			}
		}))
		.map(e=>{
			e.$on("edit",edit)
			e.$on("delete",delTask)
		})
		app.update(e=>{
			tag.innerHTML = "";
			e.map(task =>new Task({
				target:tag,
				props:{
					type:"print",
					task
				}
			}))
			.map(e=>{
				e.$on("edit",edit)
				e.$on("delete",delTask)
			})
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
