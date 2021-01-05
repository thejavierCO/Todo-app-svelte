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
<div class="col task" task={task.id} date={task.date}>
    <div class="name"><span>{task.name||"untitle"}</span></div><hr>
    <div class="description"><span>{task.description||"undescription"}</span></div>
    <div class="tools">
        <button on:click={({detail,target})=>event("edit",{target,parent:target.parentNode.parentNode,detail})}>edit</button>
        <button on:click={({detail,target})=>event("delete",{target,parent:target.parentNode.parentNode,detail})}>delete</button>
    </div>
</div>
{:else}
    <em>not defined type</em>
{/if}