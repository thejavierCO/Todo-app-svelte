<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./Home.svelte";
	import Dashboard from "./Dashboard.svelte";
	import P404 from "./404.svelte";
	let url = window.location.pathname;
</script>

<Router url={url}>
	<nav>
	  <Link to="/">Home</Link>
	  <Link to="/dashboard">Dashboard</Link>
	  <Link to="/404">404</Link>
	</nav>
	<div>
		<Route path="/">
			<Home />
		</Route>
		<Route path="/dashboard">
			<Dashboard />
		</Route>
		<Route>
			<P404 />
		</Route>
	</div>
</Router>
