<script context="module">
	import { page } from "$app/stores";
</script>

<div class="container p-4 text-center">
	<h1>{$page.status} : {$page.error.message}</h1>
</div>
