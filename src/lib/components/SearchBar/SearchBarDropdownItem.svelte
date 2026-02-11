<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		isSelected?: boolean;
		onHover?: () => void;
		children: Snippet;
	}

	let { isSelected = false, onHover, children }: Props = $props();
</script>

<div
	class="p-2 {isSelected ? 'bg-focused-primary' : ''}"
	onmouseenter={onHover}
	role="option"
	aria-selected={isSelected}
	tabindex="-1"
>
	{@render children()}
</div>
