<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { NavBar } from '$lib/components/NavBar';
	import { SideBar } from '$lib/components/SideBar';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Etincelle</title>
	<meta name="description" content="Etincelle Web App" />
	<link rel="icon" href={favicon} />
</svelte:head>
<div>
	<NavBar />
	<div class="hstack">
		<SideBar />
		{@render children()}
	</div>
</div>
