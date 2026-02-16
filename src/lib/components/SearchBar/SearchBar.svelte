<script lang="ts">
	import { searchStore } from '$lib/stores/search/search';
	import SearchBarDropdownMenu from './SearchBarDropdownMenu.svelte';

	let inputElement: HTMLInputElement;
	let dropdownElement: HTMLDivElement;

	// Subscribe to store
	$: ({ query, results, isOpen, isLoading, error, selectedIndex } = $searchStore);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			searchStore.setOpen(false);
			inputElement?.blur();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (isOpen && results.length > 0) {
				searchStore.incrementSelectedIndex();
			}
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (isOpen && results.length > 0) {
				searchStore.decrementSelectedIndex();
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			if (isOpen && results.length > 0 && selectedIndex >= 0 && results[selectedIndex]) {
				window.location.href = `/works/${encodeURIComponent(results[selectedIndex].uri)}`;
			}
		}
	}

	function handleFocus() {
		if (query.trim().length >= 2 && results.length > 0) {
			searchStore.setOpen(true);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			searchStore.setOpen(false);
		}
	}

	$: if (typeof window !== 'undefined') {
		if (isOpen) {
			window.addEventListener('mousedown', handleClickOutside);
		} else {
			window.removeEventListener('mousedown', handleClickOutside);
		}
	}
</script>

<div class="relative w-full max-w-2xl" bind:this={dropdownElement}>
	<input
		bind:this={inputElement}
		type="text"
		value={query}
		oninput={(e) => searchStore.setQuery(e.currentTarget.value)}
		onkeydown={handleKeyDown}
		onfocus={handleFocus}
		placeholder="Search..."
		class="placeholder:text-text-tertiary w-full border border-border-primary bg-bgd-secondary px-2 py-1 text-text-primary outline-none"
	/>

	{#if isOpen}
		<SearchBarDropdownMenu
			{results}
			{isLoading}
			{error}
			{selectedIndex}
			{query}
			onItemHover={(index) => searchStore.applyAutocomplete(index)}
			onItemSelect={() => searchStore.setOpen(false)}
		/>
	{/if}
</div>
