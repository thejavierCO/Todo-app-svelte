<script>
    // import {onDestroy} from "svelte"
    // import {tasks} from "../js/app"
    // const sub = tasks.subscribe(a=>{
    //     a.forEach(e=>Storage.File(e.id,JSON.stringify(e)))
    // })
    // const add = ({target})=>{
    //     let title = target.querySelector("[title]").value
    //     let description = target.querySelector("[description]").value;
    //     if(title===""||description==="")throw {error:"data is void"}
    //     else tasks.push({title,description})
    // }
    // const deleteT = (a)=>tasks.pop(a)
    // onDestroy(()=>sub());
</script>
<!-- <h1>dashboard</h1>
<form on:submit|preventDefault={add}>
    <input type="text" placeholder="title" title>
    <input type="text" placeholder="description" description>
    <input type="submit" value="enviar">
</form>
{#each $tasks as {title,description,id}}
    <ul>
        <li>id: {id}</li>
        <li>title: {title}</li>
        <li>description: {description}</li>
        <li><button on:click={()=>deleteT(id)}>Delete</button></li>
    </ul>
{/each} -->