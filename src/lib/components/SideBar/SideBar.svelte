<script>
	import { userStore } from '$lib/stores/user/userStore';
	import { IconBook2, IconHome, IconUser } from '@tabler/icons-svelte';
	import UserAvatar from '../UserAvatar/UserAvatar.svelte';
	import SideBarRow from './SideBarRow.svelte';
</script>

<ul class="vstack w-full max-w-64 gap-4 p-8">
	<SideBarRow route="/">
		<IconHome size={18} />
		<li>Home</li>
	</SideBarRow>

	<SideBarRow route="/inventaire">
		<IconBook2 size={18} />
		<li>Inventaire</li>
	</SideBarRow>

	<SideBarRow route="/profile">
		{#if $userStore.user}
			<a class="h-4.5 w-4.5" href="/profile">
				<UserAvatar url={$userStore.user.picture} />
			</a>
		{:else}
			<IconUser size={18} />
		{/if}
		<li>Profile</li>
	</SideBarRow>
</ul>
