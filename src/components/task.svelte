<script>
    import {createEventDispatcher} from "svelte"
    export let type;
    export let task;
    let event = new createEventDispatcher();
</script>