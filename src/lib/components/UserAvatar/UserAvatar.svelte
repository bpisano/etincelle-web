<script lang="ts">
	interface Props {
		url?: string;
	}

	let { url }: Props = $props();

	let resolvedUrl = $derived.by(() => {
		if (!url) return null;
		if (url.startsWith('/')) {
			return 'https://inventaire.io' + url;
		}
		return url;
	});
</script>

<div class=" rounded-full border border-border-primary">
	{#if resolvedUrl}
		<img src={resolvedUrl} alt="User Avatar" class="overflow-hidden rounded-full object-cover" />
	{:else}
		<div class="flex items-center justify-center rounded-full bg-gray-300">
			<span class="text-gray-600">?</span>
		</div>
	{/if}
</div>
