<script>
	import { login } from "../js/app";
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import Dashboard from "./Dashboard.svelte";
	import P404 from "./404.svelte";
	export let app;
	export let tasks;
	const Auth = app.auth;
    const loginbtn = (a)=>a.addEventListener("click",()=>{if(!Auth.islogin)Auth.login();else Auth.exit();});
</script>

<div class="container">
	<Router>
		<div class="navbar">
			<Link to="/">Home</Link>
			{#if $login}
			<Link to="/dashboard">Dashboard</Link>
			{/if}
			<button use:loginbtn>{#if $login}exit{:else}login{/if}</button>
		</div>
		<div class="container">
			<Route path="/">
				<Home {Auth}/>
			</Route>
			{#if $login}
			<Route path="/dashboard">
				<Dashboard {Auth} {tasks}/>
			</Route>
			{/if}
			<Route>
				<P404 />
			</Route>
		</div>
	</Router>
</div>

