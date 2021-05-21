<script>
    import Bubble from './_components/bubble.svelte'
    import Logo from './_components/logo.svelte'
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    let begin = false;
    onMount(() => {
        begin = true;
	});
</script>

<Logo />
<main>
    {#if begin}
        <h1 in:fade="{{ duration: 2500 }}">Watch this space!</h1>
        <h2 in:fly="{{ x: 200, delay: 500, duration: 1000 }}">Internships</h2>
        <h2 in:fly="{{ y: 150, delay: 1000, duration: 800 }}">Discounts</h2>
        <h2 in:fly="{{ x: -120, delay: 1500, duration: 600 }}">Vacancies</h2>
        <h2 in:fly="{{ y: -110, delay: 2000, duration: 400 }}">Care</h2>
        <h2 in:fly="{{ x: 100, delay: 2500, duration: 200 }}">Benefits</h2>
    {/if}
    <Bubble/>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}
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