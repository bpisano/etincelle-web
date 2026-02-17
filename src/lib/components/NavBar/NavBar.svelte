<script>
	import { userStore } from '$lib/stores/user/userStore';
	import SearchBar from '../SearchBar/SearchBar.svelte';
	import UserAvatar from '../UserAvatar/UserAvatar.svelte';
</script>

<nav class="vstack items-center p-4">
	<div class="hstack w-full items-center justify-between">
		<div></div>

		<SearchBar />

		{#if $userStore.user}
			<a class="h-10 w-10" href="/profile">
				<UserAvatar url={$userStore.user.picture} />
			</a>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</div>
</nav>
