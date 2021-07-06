<script context="module">
	export const prerender = true;
</script>

<script>
    import Bubble from '$lib/Components/bubble.svelte'
    import Logo from '$lib/Components/logo.svelte'
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';

    let begin = false;
    onMount(() => {
        begin = true;
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="">
    <Logo />

    <div class="text-center">
        {#if begin}
        <h1 in:fade="{{ duration: 500 }}">Watch this space!</h1>
        <h2 in:fly="{{ x: 200, delay: 500, duration: 1000 }}">Internships</h2>
        <h2 in:fly="{{ y: 150, delay: 800, duration: 800 }}">Discounts</h2>
        <h2 in:fly="{{ x: -120, delay: 1000, duration: 600 }}">Vacancies</h2>
        <h2 in:fly="{{ y: -110, delay: 1200, duration: 400 }}">Wellness</h2>
        <h2 in:fly="{{ x: 100, delay: 1500, duration: 200 }}">Benefits</h2>
    {/if}
    </div>
</div>

<!-- <Bubble/> -->

<style>
    h1{
        margin-top: 5rem;
        font-size: 3em;
        color: var(--logo-orange);
    }
    h2{
        color: var(--text);
        font-size: 2.4em;
        margin: 1rem;
    }
</style>
