<script>
  import { onMount } from "svelte";
  export let app;
  onMount(() => {
    console.log(app, document.querySelector("div.print"));
  });
</script>

<div class="row row-cols-4">
  {#each app.data as { data: item }}
    <div class="print">
      <span class="task_title">{item.data.name}</span>
      <span class="task_description">{item.data.description}</span>
    </div>
  {/each}
</div>

<style>
  div.print {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    word-wrap: break-word;
    justify-content: space-around;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    max-height: 300px;
  }
  div.print span {
    padding: 5px;
    display: flex;
    word-break: break-word;
    width: 100%;
    height: 100%;
  }
  div.print span.task_title {
    background-color: rgba(0, 0, 0, 0.2);
  }
  div.print span.task_description {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
