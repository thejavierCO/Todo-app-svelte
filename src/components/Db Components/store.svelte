<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { get } from "svelte/store";
  import { Store } from "./store";
  import StoreUseLocalStorage from "./storeAndLocalStorage";
  export let useLocalStorage = false;

  const emit = createEventDispatcher();

  let store = new (useLocalStorage ? StoreUseLocalStorage : Store)();

  store.on("del", (_) =>
    emit("delete", {
      add: (data) => store.add(data),
      del: (id) => store.get(id).Destroy(),
      edit: (id, data) => store.get(id).edit(data),
      store: () => get(store),
    })
  );

  onDestroy(() => {
    if (useLocalStorage) store.Destroy();
  });

  onMount(() =>
    emit("mount", {
      add: (data) => store.add(data),
      del: (id) => store.get(id).Destroy(),
      edit: (id, data) => store.get(id).edit(data),
      store: () => get(store),
    })
  );
</script>

<slot
  add={(data) => store.add(data)}
  del={(id) => store.get(id).Destroy()}
  edit={(id, data) => store.get(id).edit(data)}
  store={$store}
/>

<slot name="input" />
<div class="row row-cols-4">
  {#each $store as data, index}
      <slot name="print" id={data.id} {index} {data} />
  {/each}
</div>