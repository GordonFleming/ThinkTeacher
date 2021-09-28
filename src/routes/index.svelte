<script context="module">
	export const prerender = true
</script>

<script>
    import Logo from '$lib/Components/logo.svelte'
    import { fade, fly } from 'svelte/transition'
    import { onMount } from 'svelte'

    let begin = false
    onMount(() => {
        begin = true
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div>
    <div class="p-5 bg-banner text-white">
        <Logo />
    </div>


    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path class="" fill="#CAE9FF" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
    </svg>

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
    .bg-banner{
        background-color: #CAE9FF;
    }
</style>
