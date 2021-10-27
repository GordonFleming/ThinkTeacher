<script>
    import { onMount } from 'svelte'
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
            }else{
                legal.push(item)
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
    let legal = []
    let health = []
</script>

<div class="container text-center">
    <h1>Exclusive benefits for <span class="text-logo-gold">Think</span>Teacher members</h1>

    <div class="nav-wrapper mt-3">
        <ul class="list-inline">
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('travel').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Travel <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('legal').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Legal <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('MedicalAid').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Medical Aid <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Courses <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('insurance').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Insurance <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('wellness').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Wellness</h4></li>
        </ul>
    </div>
    
    <div class="row mt-4 mb-5 justify-content-center">
        {#if loading}
            <div class="d-flex justify-content-center mt-5">
                <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
            </div>
        {:else}
        <!-- Travel -->
            <div class="grey-grad row justify-content-center" id="travel">
                <h2 class="display-3">Travel</h2>
                <div class="col-6">
                    <div class="card mb-3 bg-dark" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-5">
                            <img
                            src="{travel[0].partner.logo.url}"
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
                            <small class="text-muted">email: <a href="mailto:{travel[0].partner.email}">{travel[0].partner.email}</a></small>
                            </div>
                            <p class="card-footer card-text">
                                <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + travel[0].partner.slug)}>Learn more</button>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-2">
                    {#each travel as trvl}
                        <div class="col-sm-12 col-md-10 col-lg-6">
                            <div class="card bg-dark m-2 shadow-lg">
                                <img class="img-fluid rounded"  src="{trvl.banner.url}" alt="cover">
                                <div class="card-body">
                                    <h3 class="card-title text-logo-gold">{trvl.name}</h3>
                                    <p class="card-text">
                                        {trvl.description}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <span class="badge bg-light">{trvl.partner.name}</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

        <!-- Legal -->
            <div class="grey-grad row justify-content-center big-gap" id="legal">
                <h2 class="display-3">Legal</h2>
                <h4>Coming soon</h4>
            </div>

        <!-- MedicalAid -->
            <div class="grey-grad row justify-content-center big-gap" id="MedicalAid">
                <h2 class="display-3">Medical Aid</h2>
                <h4>Coming soon</h4>
            </div>

        <!-- Courses -->
            <div class="grey-grad row justify-content-center big-gap" id="courses">
                <h2 class="display-3">Courses</h2>
                <h4>Coming soon</h4>
            </div>

        <!-- Insurance -->
            <div class="grey-grad row justify-content-center big-gap" id="insurance">
                <h2 class="display-3">Insurance</h2>
                <h4>Coming soon</h4>
            </div>

        <!-- Wellness -->
            <div class="grey-grad row justify-content-center big-gap" id="wellness">
                <h2 class="display-3">Wellness</h2>
                <h4>Coming soon</h4>
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