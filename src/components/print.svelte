<script>
  import { onMount } from "svelte";
  export let app;
  onMount(() => {
    console.log(app, document.querySelector("div.print"));
  });
</script>

{#each app.data as { data: item }}
  <div class="print">
    <slot task={item.data}>
      <span>name: {item.data.name}</span>
      <span>description: {item.data.description}</span>
    </slot>
  </div>
{/each}

<style>
  div.print {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    word-wrap: break-word;
    justify-content: space-around;
  }
  div.print span {
    padding: 10px;
    display: flex;
    word-break: break-word;
  }
</style>
