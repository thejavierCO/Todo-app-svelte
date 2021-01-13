<script>
    import {onMount} from "svelte"
    export let storage;
    let list = [];
    onMount(()=>{
        let taglist = document.querySelector("[list-task]")
        storage((a,b)=>{
            list = b;
        })
    })
</script>
<ul list-task>
    {#each list as {title,description}}
        <ul>
            <li>id</li>
            <li>{title}</li>
            <li>{description}</li>
        </ul>
    {/each}
</ul>