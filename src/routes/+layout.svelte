<script>
    import Header from "$lib/Header/index.svelte";
    import Footer from "$lib/Footer/index.svelte";
    import "../bootstrap.css";
    import "../app.css";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import { userState } from "$lib/stores/userState.svelte.js";

    const { data, children } = $props();

    // Update user state when data changes
    $effect(() => {
        if (data.user) {
            userState.user = data.user;
            userState.isAuthenticated = true;
        }
    });

    const options = {};
</script>

<Header />

<div class="container-fluid">
    {@render children()}
</div>
<Footer />

<SvelteToast {options} />

<style>
    main {
        min-height: calc(100vh - 80px); /* Adjust based on your header height */
    }
</style>
