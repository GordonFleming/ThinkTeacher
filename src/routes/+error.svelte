<script context="module">
    import { page } from "$app/stores";
</script>

<svelte:head>
    <title>{$page.status} | ThinkTeacher</title>
</svelte:head>

<div class="container p-4 text-center">
    <h2>{$page.status}</h2>
    <h1>{$page.error.message}</h1>
</div>
