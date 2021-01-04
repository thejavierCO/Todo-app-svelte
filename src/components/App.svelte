<script>
	import Main from "./Main.svelte";
	export let app;
	console.log(app);
</script>

<Main {app}>
	<div slot="tasks"></div>
	<template slot="task">
		<div name>name</div>
		<div description>description</div>
		<div date></div>
	</template>
</Main>