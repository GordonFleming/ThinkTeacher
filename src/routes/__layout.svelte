<script>
	import Header from '$lib/Header/index.svelte';
    import Footer from '$lib/Footer/index.svelte';
    import '../bootstrap.css';
    import '../app.css';
</script>

<Header />

<div class="container">
	<slot />
</div>

<Footer />

<style>

</style>
