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
        <form on:submit|preventDefault={({target:{nameItem,descriptionItem}})=>add({name:nameItem.value, description:descriptionItem.value})}>
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
              <button on:click={()=>edit(id)} class="btn btn-primary">edit</button>
              <button on:click={()=>{
                // document.querySelector('.modalEdit').focus();
              }} class="btn btn-danger">delete</button>
          </div>
        </div>
        <!-- <div class="modalEdit">
          <div class="modal" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>  
        </div> -->
      </div>
    </Store>
  </div>
</Main>
