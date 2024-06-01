<script>
  import Main from "./Main.svelte";
  import Store from "./store.svelte";
</script>

<Main>
  <div slot="navbar">
    <div class="container">
      <h3>Todo app</h3>
    </div>
  </div>
  <div slot="content" class="col">
    <Store let:add let:edit let:del useLocalStorage>
      <div slot="input" class="justify-content-center render row">
        <form on:submit|preventDefault={({target:{nameItem,descriptionItem}})=>{
            add({name:nameItem.value, description:descriptionItem.value})
            nameItem.value = ""
            descriptionItem.value = ""
          }}>
          <input type="text" placeholder="name" id="nameItem"/>
          <input type="text" placeholder="description" id="descriptionItem"/>
          <input type="submit" value="add">
        </form>
      </div>
      <div slot="print" let:id let:data let:index>
        <div class="card bg-secondary text-white">
          <div class="card-body">
            <h5 class="card-title">{data.name}</h5>
            <p class="card-text">{data.description}</p>
              <button on:click={()=>{
                console.warn("not working")
              }} class="btn btn-primary">edit</button>
              <button on:click={()=>del(id)} class="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </Store>
  </div>
</Main>
