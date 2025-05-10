<script>
    import { onMount } from "svelte";

    onMount(async () => {
        // Any client-side initialization can go here
        // The server-side layout will handle authentication and redirects
    });
</script>

<div class="container text-center mt-4">
    <!-- <nav>
		<a href="/auth">Home</a>
		<a href="/auth/selections">Selections</a>
		<a href="/auth/profile">Profile</a>
	</nav> -->
    <slot />
</div>

<!-- <style>
	nav a {
		padding: 1rem;
		font-size: 1.2em;
	}
</style> -->
