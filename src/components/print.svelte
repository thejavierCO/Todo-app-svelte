<script>
  import Item from "./item.svelte";
  export let data;
</script>

<div class="print">
  <Item title={data.name} description={data.description} />
  <slot name="actions"></slot>
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
