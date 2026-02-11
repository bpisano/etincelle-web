<script lang="ts">
	import { EntityType } from '$lib/inventaire/types';
	import type { SearchEntity } from '$lib/inventaire/requests/search/types/search';

	interface Props {
		result: SearchEntity;
		onSelect?: () => void;
	}

	let { result, onSelect }: Props = $props();

	const imageUrl = $derived(
		result.image?.startsWith('/') ? `https://inventaire.io${result.image}` : result.image
	);

	const href = $derived.by(() => {
		switch (result.type) {
			case EntityType.Works:
				return `/works/${encodeURIComponent(result.uri)}`;
			default:
				return 'not-found';
		}
	});
</script>

<a {href} onclick={onSelect}>
	<div class="hstack gap-4">
		{#if imageUrl}
			<img src={imageUrl} alt={result.label} width="40" height="60" />
		{/if}
		<div class="vstack">
			<div class="font-bold">{result.label}</div>
			<div class="text-text-secondary">{result.description}</div>
		</div>
	</div>
</a>
