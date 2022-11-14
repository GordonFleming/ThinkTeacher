<script>
    import Header from "$lib/Header/index.svelte";
    import Footer from "$lib/Footer/index.svelte";
    import "../bootstrap.css";
    import "../app.css";
    import { SvelteToast } from "@zerodevx/svelte-toast";

    // Optionally set default options here
    const options = {};
</script>

<Header />

<div class="container-fluid">
    <slot />
</div>

<Footer />

<SvelteToast {options} />

<style>
</style>
