<script>
  import Item from "./item.svelte";
  export let app;
</script>

<div class="row row-cols-4">
  {#each app.data as { data: item }}
    <div class="print">
      <Item title={item.data.name} description={item.data.description} />
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
</style>
