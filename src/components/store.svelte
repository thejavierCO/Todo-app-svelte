<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { dbStore, dbStoreUseLocalStorage } from "../js/store";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();

  let db = new (useLocalStorage ? dbStoreUseLocalStorage : dbStore)();

  const store = db.store;

  onDestroy(() => {
    if (useLocalStorage) db.Destroy();
  });

  onMount(() =>
    emit("mount", {
      add: (data) => db.add(data),
      del: (id) => db.del(id),
      edit: (id, data) => db.edit(id, data),
      store: () => get(store),
    })
  );
</script>

<slot
  add={(data) => db.add(data)}
  del={(id) => db.del(id)}
  edit={(id, data) => db.edit(id, data)}
  store={$store}
/>

<slot name="input" />
<div class="row row-cols-4">
  {#each $store as data, index}
      <slot name="print" id={data.id} {index} {data} />
  {/each}
</div>