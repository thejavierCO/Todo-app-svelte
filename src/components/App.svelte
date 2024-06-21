<script>
  import Main from "./Main.svelte";
  import Store from "./store.svelte";
  let isEdit = false;
</script>

<Main>
  <div slot="navbar">
    <div class="container">
      <h3>Todo app</h3>
    </div>
  </div>
  <div slot="content" class="col">
    <Store let:add let:edit let:del useLocalStorage>
      <form slot="input" on:submit|preventDefault={({target:a})=>{
          let data = {};
          let inputs = a.querySelectorAll("input[name]");
          inputs.forEach((a)=>{
            if(a.type == "checkbox"){
              data[a.name] = a.checked;
            }else a.value!=""?data[a.name] = a.value:""
          });
          if(isEdit) edit(data.id,data);else add(data);
          inputs.forEach((a)=>{
            if(a.type == "checkbox") a.checked = false;else a.value = ""
          });
          if(isEdit!=false)isEdit = false;
        }} class="justify-content-center render row">
        <input type="text" placeholder="title" name="title"/>
        <input type="text" placeholder="description" name="description"/>
        <input type="checkbox" name="done">
        <input type="text" name="id" disabled/>
        {#if isEdit}
          <input type="submit" value="edit">
        {:else}
          <input type="submit" value="add">
        {/if}
      </form>
      <div slot="print" let:id let:data class="card bg-secondary text-white overflow-auto" style="height:190px;">
        <div class="card-body" class:done={data.done} class:text-dark={data.done} >
          <h5 class="card-title">{data.title}</h5>
          <p class="card-text">{data.description}</p>
            <button on:click={()=>document
            .querySelector("form[slot=input]")
            .querySelectorAll("input[name]")
            .forEach((a)=>{
              if(a.type == "checkbox") a.checked = data[a.name];else a.value = data[a.name];
              isEdit = true;
            })} class="btn btn-primary">edit</button>
            <button on:click={()=>del(id)} class="btn btn-danger">delete</button>
        </div>
      </div>
    </Store>
  </div>
</Main>

<style>
  .done{
    background-color: yellow;
  }
</style>