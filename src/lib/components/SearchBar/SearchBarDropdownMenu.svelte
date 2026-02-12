<script lang="ts">
	import type { SearchEntity } from '$lib/inventaire/requests/search/types/search';
	import SearchBarDropdownItem from './SearchBarDropdownItem.svelte';
	import SearchEntityItem from './SearchEntityItem.svelte';

	interface Props {
		results: SearchEntity[];
		isLoading: boolean;
		error: string | null;
		selectedIndex: number;
		query: string;
		onItemHover: (index: number) => void;
		onItemSelect: () => void;
	}

	let { results, isLoading, error, selectedIndex, query, onItemHover, onItemSelect }: Props =
		$props();
</script>

<div
	class="absolute top-full right-0 left-0 z-10 border border-t-0 border-border-primary bg-bgd-secondary"
>
	{#if error}
		<div class="p-4">Error: {error}</div>
	{/if}

	{#if !error && results.length === 0 && !isLoading}
		<div class="p-4">No books found</div>
	{/if}

	{#if !error && results.length > 0}
		<div class="vstack">
			{#each results as result, index}
				<SearchBarDropdownItem
					isSelected={selectedIndex >= 0 && index === selectedIndex}
					onHover={() => onItemHover(index)}
				>
					<SearchEntityItem {result} onSelect={onItemSelect} />
				</SearchBarDropdownItem>
			{/each}
			<div class="pt-2">
				<a href="/search?q={encodeURIComponent(query)}">View more results</a>
			</div>
		</div>
	{/if}

	{#if isLoading && results.length === 0}
		<div class="p-4">Searching...</div>
	{/if}
</div>
