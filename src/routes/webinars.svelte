<script>
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.thinkteacher.co.za"
    }

    let loading = true

    onMount(async () => {
        try {
            const res = await axios.get(`${API_URL}/webinars?_sort=id:DESC`)
            webinars = res.data
            loading = false
            console.log(webinars)
        } catch (e) {
            error = e
        }
	});


	let webinars = [];
</script>

<svelte:head>
	<title>Webinars</title>
</svelte:head>

<div class="container mt-5 mb-5">
    <div class="row text-center justify-content-center">
        <h1 class="mb-4"><span class="think">Think</span>Teacher Webinars</h1>

        {#if loading}
            <div class="d-flex justify-content-center mt-5">
                <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
            </div>
        {:else}
            {#each webinars as webinar}
                <div class="col-lg-6 col-md-12 mt-2">
                    <div class="webinar-wrapper">
                        <div class="frame-wrapper">
                            <iframe src="{webinar.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <p class="text-white mt-2">{webinar.description}</p>
                    </div>
                </div>
            {/each}
        {/if}
        
    </div>
</div>

<style>
    iframe{
        position: absolute;
        max-width: 800px;
        top: 0;
        left: 0;
        width: 100%;
        height: 320px;
    }
    p{
        text-align: justify;
    }
    .frame-wrapper{
        position: relative;
        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .webinar-wrapper{
        padding: 3%;
        position: relative;
        background-color: var(--logo-grey);
        border-radius: 5px;
        border: 3px solid var(--logo-gold);
        height: 100%;
    }
</style>