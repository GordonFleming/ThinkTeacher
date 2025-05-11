<script>
    import Header from "$lib/Header/index.svelte";
    import Footer from "$lib/Footer/index.svelte";
    import "../bootstrap.css";
    import "../app.css";
    import { SvelteToast } from "@zerodevx/svelte-toast";

    const { data, children } = $props();
    let user = data.user;

    const options = {};
</script>

<Header {user} />

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
