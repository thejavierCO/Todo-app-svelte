<script>
  export let title;
  export let description;
</script>

<div class="print_item">
  <span class="task_title">{title}</span>
  <span class="task_description">{description}</span>
</div>

<style>
  div.print_item span {
    padding: 5px;
    display: flex;
    word-break: break-word;
    width: 100%;
    height: 100%;
  }
  div.print_item span.task_title {
    background-color: rgba(0, 0, 0, 0.2);
  }
  div.print_item span.task_description {
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
