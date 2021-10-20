<script>
    import { onMount, afterUpdate } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let health_cat = 3, travel_cat = 2
    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
        health_cat = 2, travel_cat = 1
    }

    let loading = true

    onMount(async () => {
        function seperatePackages(item){
            if(item.partner.category === travel_cat){
                travel.push(item)
                console.log("test", travel)
            }else if(item.partner.category === health_cat){
                health.push(item)
            }
        }

        try {
            const res = await axios.get(`${API_URL}/packages`)
            benefits = res.data
            benefits.forEach(seperatePackages)
            loading = false
            console.log(benefits)
        } catch (e) {
            error = e
        }
	});


	let benefits = []
    let travel = []
    let health = []
</script>

<div class="container text-center">
    <h1>Exclusive benefits for <span class="text-logo-gold">Think</span>Teacher members</h1>

    <div class="nav-wrapper mt-3">
        <small>scroll to...</small>
        <ul class="list-inline">
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('travel').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Travel <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4>Legal <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4>Health</h4></li>
        </ul>
    </div>
    
    <div class="row mt-4 mb-4 justify-content-center">
        {#if loading}
            <div class="d-flex justify-content-center mt-5">
                <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
            </div>
        {:else}
            <div class="grey-grad row justify-content-center" id="travel">
                <h2 class="display-3">Travel</h2>
            <div class="col-6">
                <div class="card mb-3 bg-dark" style="max-width: 540px;">
                    <div class="row g-0">
                    <div class="col-md-5">
                        <img
                        src="http://localhost:1337{travel[0].partner.logo.url}"
                        alt="logo"
                        class="img-fluid"
                        />
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                        <h3 class="card-title">{travel[0].partner.company_name}</h3>
                        <p class="card-text">
                            {travel[0].partner.description}
                        </p>
                        </div>
                        <p class="card-footer card-text">
                            <small class="text-muted">email: <a href="mailto:{travel[0].partner.email}">{travel[0].partner.email}</a></small>
                        </p>
                    </div>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
            {#each benefits as benefit}
                <div class="col-sm-12 col-md-10 col-lg-6">
                    <div class="card bg-dark m-2 shadow-lg">
                        <img class="img-fluid rounded"  src="http://localhost:1337{benefit.banner.url}" alt="cover">
                        <div class="card-body">
                            <h3 class="card-title text-logo-gold">{benefit.name}</h3>
                            <p class="card-text">
                                {benefit.description}
                            </p>
                        </div>
                        <div class="card-footer">
                            <span class="badge bg-light">{benefit.partner.name}</span>
                        </div>
                    </div>
                </div>
            {/each}
            </div>
            </div>
        {/if}
    </div>
</div>

<style>
    ul li h4{
        transition: 0.3s;
    }
    ul li h4:hover{
        cursor: pointer;
        font-size: 135%;
    }
</style>