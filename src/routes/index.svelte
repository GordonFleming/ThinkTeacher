<script context="module">
	export const prerender = true
</script>

<script>
    import Logo from '$lib/Components/logo.svelte'
    import { goto } from '$app/navigation'
    import { CountUp } from 'countup.js'
    import { onMount, afterUpdate } from 'svelte'
    import { prod } from '$lib/env.js'
    import {name} from '$lib/stores'
    import axios from 'axios'

    import { fly, fade } from 'svelte/transition';

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let loading = true, test = null
    let countUp, userCount = 100

    setTimeout(function(){
        test = false
    },3000);

    onMount(async () =>{
        try {
            const res = await axios.get(`${API_URL}/users/count`)
            userCount += res.data
            loading = false
            console.log(userCount)
        } catch (e) {
            let error = e
            console.log(error)
        }
        countUp = new CountUp('countUser', userCount);
        countUp.start();
        test = true
	})

    afterUpdate(() =>{
        $name = localStorage.getItem("name");
        console.log($name)
	})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="banner-all">
    <div class="bg-overlay"></div>
    <div class="p-5 bg-banner text-center">
        {#if test}
            <h1 style="font-size: 8em; margin-top:0;" in:fly="{{ x: -200, duration: 3000 }}" >Welcome to</h1>
        {:else if test !== null && !test}
            <Logo />
        {/if}
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path class="" fill="var(--bg-banner)" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
    </svg>
</div>

<!-- svelte-ignore a11y-missing-content -->
<h1 class="text-center" id="countUser"></h1>
<h3 class="text-center">Members and counting!</h3>

<div class="container mt-5 mb-5">
    {#if !$name}
        <div class="row text-center mt-4">
            <div class="col-sm-12 col-lg-6">
                <h3 class="fs-1 mt-4">First 5 000 members FREE</h3>
            </div>
            <div class="col-sm-12 col-lg-6 mt-sm-3">
                <button class="btn btn-lg btn-dark mx-auto" style="width: 300px;" on:click={() => goto("/register")}><h4 class="text-white">Become a member!</h4></button>
            </div>
        </div>
    {/if}

    <div class="row text-center mt-5 bg-other rounded p-5 shadow-lg">
        <h3 class="read">Think Teacher is an online portal dedicated to the inspiring teachers of South Africa, providing access to benefit options, educational opportunities 
            and nurturing networks. Think Teacher's vision is further to empower teachers to thrive in their role as innovative and sustainable change agents in and for South Africa.
        </h3>
    </div>
    <div class="row text-center mt-5">
        <h2 class="mb-4">Benefits</h2>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer offer-img" src="/wellness-blue.svg" alt="well being">
            <h3 class="mt-3">Well-being</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer offer-img" src="/travel-orange.svg" alt="travel" on:click={() => goto("/partners/Gillian-Jane-Doig")}>
            <h3 class="mt-3">Travel</h3>
        </div>        
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer offer-img" src="/health-blue.svg" alt="medical aid" on:click={() => goto("/partners/KAREN-HOWARD")}>
            <h3 class="mt-3">Medical Aid</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer-img" src="/invest-blue.svg" alt="invest">
            <h3 class="mt-3">Insurance</h3>
            <h5 class="text-logo-orange">coming soon</h5>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer-img" src="/legal-orange.svg" alt="legal">
            <h3 class="mt-3">Legal</h3>
            <h5 class="text-logo-orange">coming soon</h5>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <img class="img-fluid offer-img" src="/teaching-blue.svg" alt="courses">
            <h3 class="mt-3">Courses</h3>
            <h5 class="text-logo-orange">coming soon</h5>
        </div>
    </div>

    <div class="row mt-5 text-center justify-content-center">
        <div class="col-3">
            <img class="img-fluid logo" src="SAHB.png" alt="partner">
        </div>
        <div class="col-3 d-flex flex-wrap align-items-center">
            <img class="img-fluid logo" src="ROARRR.png" alt="partner">
        </div>
        <div class="col-3">
            <img class="img-fluid logo" src="Cirrus.jpg" alt="partner">
        </div>
        <div class="col-3">
            <img class="img-fluid logo" src="kim.png" alt="partner">
        </div>
    </div>
</div>

<!-- @media screen and (min-width: 1800px) {
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
} -->

<style>
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
    .read{
        line-height: 2;
    }
    .banner-all{
        position: relative;
    }
    .bg-banner{
        background-color: var(--bg-banner);
        /* background-image: linear-gradient(130deg, #CACFD9 0%, rgb(187, 190, 196) 89%);; */
    }
    .bg-overlay{
        background-image: url("/shape-overly.png");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        opacity: 0.15;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
    }
    /* TODO */
    /* Make max height smaller for smaller screeens */
    .offer-img{
        max-height: 220px;
    }
    .offer{
        transition: all 0.5s;
    }
    .offer:hover{
        transform: scale(1.08);
        cursor: pointer;
    }
    .btn-lg{
        padding: 2rem 1rem 1rem 1rem;
    }
    .logo{
        max-height: 150px;
        width: auto;
    }
</style>
