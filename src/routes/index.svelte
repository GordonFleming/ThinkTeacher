<script context="module">
	export const prerender = true
</script>

<script>
    import Logo from '$lib/Components/logo.svelte'
    import { goto } from '$app/navigation';
    import { CountUp } from 'countup.js';
    import { onMount } from 'svelte'
    import axios from 'axios'

    let loading = true
    let countUp, userCount = 102
    const API_URL = 'http://localhost:1337/users/count'

    onMount(async () =>{
        try {
            const res = await axios.get(API_URL)
            userCount = res.data
            loading = false
            console.log(userCount)
        } catch (e) {
            error = e
        }
        countUp = new CountUp('countUser', userCount);
        countUp.start();
	})

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="p-5 bg-banner text-white test">
    <Logo />
</div>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
    <path class="" fill="#252638" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
    c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
    c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
</svg>


<!-- svelte-ignore a11y-missing-content -->
<h1 class="text-center" id="countUser"></h1>
<h3 class="text-center">Members and counting!</h3>

<div class="container mt-5">
    <div class="row text-center">
        <h2 class="mb-4">Offerings In</h2>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer" src="/wellness-blue.svg" alt="wellness">
            <h3 class="mt-3">Wellness</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer" src="/travel-orange.svg" alt="travel">
            <h3 class="mt-3">Travel</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer" src="/invest-blue.svg" alt="invest">
            <h3 class="mt-3">Investment</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer" src="/legal-orange.svg" alt="legal">
            <h3 class="mt-3">Legal</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer" src="/teaching-blue.svg" alt="teaching">
            <h3 class="mt-3">Teaching</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer" src="/health-orange.svg" alt="health">
            <h3 class="mt-3">Health</h3>
        </div>
    </div>

    <div class="row text-center mt-5 bg-banner rounded text-white p-5">
        <h3 class="read">Think Teacher is an online portal dedicated to the inspiring teachers of South Africa, providing access to benefit options, educational opportunities 
            and nurturing networks. Think Teacher's vision is further to empower teachers to thrive in their role as innovative and sustainable change agents in and for South Africa.
        </h3>
    </div>

    <div class="row text-center mt-5">
        <h4>Don't forget to...</h4>
        <button class="btn btn-lg btn-dark mx-auto" style="width: 15rem;" on:click={() => goto("/register")}>Become a member!</button>
    </div>
</div>

<style>
    @media screen and (min-width: 1800px) {
        .test{
            background-image: url("Frame.svg");
            background-repeat: no-repeat; /* Do not repeat the image */
            background-size: contain;
            background-attachment: fixed;
        }
    }
    @media screen and (min-width: 1200px) and (max-width: 1800px) {
        .test{
            background-image: url("FrameSmall.svg");
            background-repeat: no-repeat; /* Do not repeat the image */
            background-size: contain;
            background-attachment: fixed;
        }
    }

    h1{
        margin-top: 5rem;
        font-size: 3em;
        color: var(--logo-orange);
    }
    h2{
        color: var(--text);
        font-size: 2.4em;
        text-align: center;
    }
    h3{
        font-family: 'Mulish', sans-serif;
    }
    .read{
        line-height: 2;
    }
    .bg-banner{
        background-color: #252638;
    }
    .offer{
        max-width: 250px;
        transition: all 0.5s;
    }
    .offer:hover{
        transform: scale(1.08);
        cursor: pointer;
    }
    .btn-lg{
        padding: 2rem 1rem 2rem 1rem;
    }
</style>
