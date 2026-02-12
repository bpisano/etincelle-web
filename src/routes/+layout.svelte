<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { NavBar } from '$lib/components/NavBar';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div>
	<NavBar />
	{@render children()}
</div>
