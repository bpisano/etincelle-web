<script lang="ts">
	import { enhance } from '$app/forms';

	let { form }: { form: FormData } = $props();
</script>

<form class="vstack" method="POST" use:enhance>
	<h1>Login</h1>

	<div class="hstack">
		<label for="username">Username:</label>
		<input type="text" id="username" name="username" required />
	</div>

	<div class="hstack">
		<label for="password">Password:</label>
		<input type="password" id="password" name="password" required />
	</div>

	<button type="submit">Login</button>

	{#if form}
		<div class="text-red-500">{form}</div>
	{/if}
</form>
