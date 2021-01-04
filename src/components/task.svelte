<script>
    import {createEventDispatcher} from "svelte"
    export let type;
    export let task;
    let event = new createEventDispatcher();
    let newTask = ({target})=>{
        let name = target.querySelector(".nameNewTask").value;
        let description = target.querySelector(".descriptionNewTask").value;
        event("new",{name,description})
    }
</script>

{#if type === "input"}
<form id="newTask" on:submit|preventDefault={newTask}>
    <input type="name" class="nameNewTask"/>
    <input type="description" class="descriptionNewTask"/>
    <input type="submit" value="guardar">
</form>
{:else if type === "print"}
<div class="col task">
    <div class="name">{task.name}</div>
    <div class="description">{task.description}</div>
    <div class="date">{task.date}</div>
    <div class="id">{task.id}</div>
</div>
{:else}
    <em>not defined type</em>
{/if}