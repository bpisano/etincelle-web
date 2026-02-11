<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div>
	<h1>{data.entity.labels.fr}</h1>
</div>
