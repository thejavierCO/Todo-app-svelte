<script>
    import {createEventDispatcher} from "svelte"
    export let type;
    export let task;
    let event = new createEventDispatcher();
    let newTask = ({target})=>{
        let name = target.querySelector(".nameNewTask").value;
        let description = target.querySelector(".descriptionNewTask").value;
        let id = target.querySelector(".idNewTask").value;
        event("new",{name,description,id})
    }
</script>

{#if type === "input"}
<form id="newTask" on:submit|preventDefault={newTask}>
    <input type="input" class="nameNewTask"/>
    <input type="input" class="descriptionNewTask"/>
    <input type="number" class="idNewTask" value="0"/>
    <input type="submit" value="guardar">
</form>
{:else if type === "print"}
<div class="col task">
    <div class="name"><span>{task.name}</span></div>
    <div class="description"><span>{task.description}</span></div>
    <div class="date"><span>{task.date}</span></div>
    <div class="id"><span>{task.id}</span></div>
</div>
{:else}
    <em>not defined type</em>
{/if}