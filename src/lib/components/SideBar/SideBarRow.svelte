<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';

	interface Props {
		route: string;
		children: Snippet;
	}

	let { route, children }: Props = $props();

	const isActive = $derived(page.url.pathname === route);
</script>

<a class={`${isActive ? 'text-text-primary' : 'text-text-secondary'}`} href={route}>
	<div class="hstack items-center gap-2">
		{@render children?.()}
	</div>
</a>
