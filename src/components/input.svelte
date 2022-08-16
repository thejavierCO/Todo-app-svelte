<script>
  import { createEventDispatcher, onMount } from "svelte";
  let event = new createEventDispatcher();
  let newTask = ({ target }) =>
    event(
      "data",
      Array.from(target.querySelectorAll("input")).map((e) => ({
        tag: e,
        get value() {
          return e.value;
        },
        set value(data) {
          e.value = data;
        },
        get text() {
          return e.innerText;
        },
        set text(data) {
          e.innerText = data;
        },
      }))
    );
  onMount(() => {
    event(
      "mount",
      Array.from(document.querySelectorAll("form#newTask input")).map((e) => ({
        tag: e,
        get value() {
          return e.value;
        },
        set value(data) {
          e.value = data;
        },
        get text() {
          return e.innerText;
        },
        set text(data) {
          e.innerText = data;
        },
      }))
    );
  });
</script>

<form id="newTask" on:submit|preventDefault={newTask}>
  <slot>
    <input type="input" class="nameNewTask" />
    <input type="input" class="descriptionNewTask" />
    <input type="number" class="idNewTask" value="0" />
  </slot>
  <input type="submit" value="guardar" />
</form>
