<script>
    import {onMount} from "svelte"
    export let app;
    onMount(()=>{
        if($$slots){
            const templateTask = document.querySelector(`[slot="task"]`);
            const render = document.querySelector(`[slot="tasks"]`);
            if(templateTask===null)throw {error:"not exist template for task"}
            if(render===null)throw {error:"not exist render tag"}
            let renderData = templateTask.content;
            let process = document.createDocumentFragment();
            let tasks = app.tasks;
            tasks.forEach(task => {
                let {name,description,date} = task;
                let tagname = renderData.querySelector("[name]");
                tagname.textContent = name;
                let tagdescription = renderData.querySelector("[description]");
                tagdescription.textContent = description;
                let tagdate = renderData.querySelector("[date]");
                tagdate.textContent = date;
                let clone = renderData.cloneNode();
                process.appendChild(clone);
            });
            render.appendChild(process);
        }
    })
</script>

<main class="container">
    <div class="navbar">
        <h3>todo app</h3>
    </div>
    <div class="row">
        <div class="col">
            <slot name="tasks"></slot>
        </div>
    </div>
    <slot name="task"></slot>
</main>