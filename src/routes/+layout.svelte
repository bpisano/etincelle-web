<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { NavBar } from '$lib/components/NavBar';
	import SideBar from '$lib/components/SideBar/SideBar.svelte';
	import { userStore } from '$lib/stores/user/userStore.js';
	import type { LayoutProps } from './$types';
	import './layout.css';

	let { data, children }: LayoutProps = $props();

	$effect(() => {
		userStore.setUser(data.user);
	});
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
