<script>
    import { setContext, onMount } from "svelte";
    import { writable } from "svelte/store";
    import Header from "$lib/Header/index.svelte";
    import Footer from "$lib/Footer/index.svelte";
    import "../bootstrap.css";
    import "../app.css";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import { createUserStore } from "$lib/stores/userStore";

    const { data, children } = $props();

    // Create user store with initial data from server
    const userStore = createUserStore(data.user);

    // Make user store available throughout the app via context
    setContext("user", userStore);

    // Update store when server data changes during navigatio

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
