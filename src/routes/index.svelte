<script>
    import Logo from '$lib/Components/logo.svelte'
    import { goto } from '$app/navigation'
    import { CountUp } from 'countup.js'
    import { onMount, afterUpdate, onDestroy } from 'svelte'
    import { prod } from '$lib/env.js'
    import viewport from '$lib/useViewportAction.js';
    import { name, travelScroll, firstTime } from '$lib/stores'
    import axios from 'axios'
    import { fly } from 'svelte/transition';

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let intro = null
    let countUp, userCount = 100

    setTimeout(function(){
        intro = false
    },2250);

    onMount(async () =>{
        try {
            // To stop case where user reloads with the counter in view so therefore nothing is triggered...
            document.body.scrollTop = 0

            const res = await axios.get(`${API_URL}/users/count`)
            userCount += res.data
            console.log(userCount)
        } catch (e) {
            let error = e
            console.log(error)
        }
        countUp = new CountUp('countUser', userCount);
        intro = true
	})

    afterUpdate(() =>{
        $name = localStorage.getItem("name");
	})

    onDestroy(() => {
		$firstTime = false
	})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="banner-all">
    <div class="bg-overlay"></div>
    <div class="pt-4 bg-banner text-center">
        {#if $firstTime}
            {#if intro}
                <h1 id="welcome" in:fly="{{ x: -200, duration: 2250 }}" >Welcome to</h1>
            {:else if intro !== null && !intro}
                <Logo />
            {/if}
        {:else}
            <Logo />
        {/if}
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path class="" fill="var(--bg-banner)" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"></path>
    </svg>
</div>

<div class="container mt-5 mb-5">
    <div class="row text-center grey-grad rounded justify-content-center big-gap">
        <div class="col-12 p-4">
            <h3 class="read">Think Teacher is an online portal dedicated to the inspiring teachers of South Africa, providing access to benefit options, educational opportunities 
                and nurturing networks. Think Teacher's vision is to empower teachers to thrive in their role as innovative and sustainable change agents in and for South Africa.
            </h3>
        </div>
    </div>

    {#if !$name}
        <div class="row mt-5">
            <div class="col-sm-12 col-lg-4">
                <h4 id="#hash" class="fs-1 mt-2 text-center">First 5 000 members get a <strong>FREE</strong> membership for a year</h4>
            </div>
            <div class="col-sm-12 col-lg-4 mt-sm-4 text-center">
                <button class="btn btn-lg bg-gold shadow-lg cta" style="width: 300px;" on:click={() => goto("/register")}><h4 style="color: black;">Become a member!</h4></button>
            </div>
            <div class="col-sm-12 col-lg-4">
                <!-- svelte-ignore a11y-missing-content -->
                <h1 class="text-center" id="countUser" use:viewport
                    on:enterViewport={() => countUp.start()}></h1>
                <h3 class="text-center text-blue">Members and counting!</h3>
            </div>
        </div>
    {/if}

    <div class="row grey-grad text-center big-gap">
        <h2 class="mb-5">Benefits</h2>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <a href="/benefits"><img class="img-fluid offer offer-img" src="well-being.webp" alt="well being" on:click={() => $travelScroll='wellness'}></a>
            <h3 class="mt-3">Wellbeing</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <a href="/benefits"><img class="img-fluid offer offer-img" src="travel.webp" alt="travel" on:click={() => $travelScroll='travel'}></a>
            <h3 class="mt-3">Travel</h3>
        </div>        
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <a href="/benefits"><img class="img-fluid offer offer-img" src="health.webp" alt="medical aid" on:click={() => $travelScroll='MedicalAid'}></a>
            <h3 class="mt-3">Medical Aid</h3>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <a href="/benefits"><img class="img-fluid offer offer-img" src="insurance.webp" alt="invest" on:click={() => $travelScroll='insurance'}></a>
            <h3 class="mt-3">Insurance</h3>
            <h5 class="text-logo-gold">coming soon</h5>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <a href="/benefits"><img class="img-fluid offer offer-img" src="legal.webp" alt="legal" on:click={() => $travelScroll='legal'}></a>
            <h3 class="mt-3">Legal</h3>
            <h5 class="text-logo-gold">coming soon</h5>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 mb-5">
            <a href="/benefits"><img class="img-fluid offer offer-img" src="courses.webp" alt="courses" on:click={() => $travelScroll='courses'}></a>
            <h3 class="mt-3">Courses</h3>
            <h5 class="text-logo-gold">coming soon</h5>
        </div>
    </div>

    <div class="row mt-5 text-center justify-content-center p-3 logo-box">
        <div class="col-3">
            <img class="img-fluid logo" src="SAHB.webp" alt="partner">
        </div>
        <div class="col-3 d-flex flex-wrap align-items-center">
            <img class="img-fluid logo" src="ROARRR.webp" alt="partner">
        </div>
        <div class="col-3">
            <img class="img-fluid logo" src="Cirrus.webp" alt="partner">
        </div>
        <div class="col-3">
            <img class="img-fluid logo" src="kim.webp" alt="partner">
        </div>
    </div>
</div>

<style>
    h1{
        margin-top: 5rem;
        font-size: 3em;
        color: var(--logo-grey);
    }
    h2{
        color: var(--logo-grey);
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
        height: 400px;
    }
    @media screen and (min-width: 1000px) {
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
        #welcome{
            font-size: 8em; 
        }
    }

    @media screen and (max-width: 1000px) {
        .bg-banner{
            height: 200px;
        }
    }

    #welcome{
        margin-top:0;
    }
    #countUser{
        font-size: 5em;
        color: var(--logo-grey);
        margin-top: 1rem;
    }

    /* TODO */
    /* Make max height smaller for smaller screeens */
    .offer-img{
        max-height: 300px;
    }
    .offer{
        transition: all 0.5s;
    }
    .offer:hover{
        transform: scale(1.05);
        cursor: pointer;
    }
    .btn-lg{
        padding: 2rem 1rem 1rem 1rem;
    }
    .logo{
        max-height: 120px;
        width: auto;
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
    .logo-box{
        border: var(--logo-gold) 3px solid;
        border-radius: 2px;
    }
</style>
