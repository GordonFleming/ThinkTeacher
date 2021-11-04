<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'
    import { travelScroll, travelType } from '$lib/stores'
    import SvelteMarkdown from 'svelte-markdown'

    let health_cat = 3, travel_cat = 2
    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
        health_cat = 2, travel_cat = 1
    }

    let loading = true

    onMount(async () => {
        document.body.scrollTop = 0;
        function seperatePackages(item){
            if(item.partner.category === travel_cat){
                travel.push(item)
            }else if(item.partner.category === health_cat){
                health.push(item)
            }else{
                wellness.push(item)
                source = wellness[0].details
            }
        }

        try {
            const res = await axios.get(`${API_URL}/packages`)
            benefits = res.data
            benefits.forEach(seperatePackages)
            loading = false
        } catch (e) {
            error = e
        }  	
	});

    $: if($travelScroll && !loading){
        setTimeout(function(){
            document.getElementById(`${$travelScroll}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
        },200);            
    } 

	let benefits = []
    let travel = []
    let wellness = []
    let health = []

    function travelTypeCompute(typeTrav){
        if(typeTrav.toLowerCase() == 'ski'){
            $travelType = "ski"
        }else if(typeTrav.toLowerCase() == 'bush'){
            $travelType = "bush"
        }else{
            $travelType = "beach"
        }
        goto('/auth/form-travel')
    }

    let source, readMore = false
</script>

<svelte:head>
	<title>Benefits</title>
</svelte:head>

<div class="container text-center">
    <h1>Exclusive benefits for <span class="text-logo-gold">Think</span>Teacher members</h1>

    <div class="nav-wrapper mt-3">
        <ul class="list-inline">
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('travel').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Travel <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('wellness').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Wellbeing <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('MedicalAid').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Medical Aid <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('legal').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Legal <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Courses <span class="text-logo-gold">-</span></h4></li>
            <li class="list-inline-item"><h4 on:click={() => document.getElementById('insurance').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Insurance</h4></li>
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
                <div class="col-6 mt-3">
                    <div class="card mb-3 bg-dark mx-auto" style="max-width: 540px;">
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
                            <!-- <small class="text-muted">email: <a href="mailto:{travel[0].partner.email}">{travel[0].partner.email}</a></small> -->
                            </div>
                            <p class="card-footer card-text">
                                <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + travel[0].partner.slug)}>Read More</button>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-2 justify-content-center">
                    {#each travel as trvl}
                        <div class="col-sm-12 col-md-10 col-lg-6">
                            <div class="card bg-dark m-2 shadow-lg">
                                <img class="img-fluid rounded cta"  src="{trvl.banner.url}" alt="cover" on:click={() => travelTypeCompute(trvl.name)}>
                                <div class="card-body">
                                    <h3 class="card-title text-logo-gold">Think <span class="text-lighter-blue">{trvl.name}</span></h3>
                                    <p class="card-text">
                                        {@html trvl.description}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <span class="badge bg-light">{trvl.partner.company_name}</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

        <!-- Wellbeing -->
            <div class="grey-grad row big-gap justify-content-center" id="wellness">
                <h2 class="display-3">Wellbeing</h2>
                <div class="col-6 mt-3">
                    <div class="card mb-3 bg-dark mx-auto" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-5">
                            <img
                            src="{wellness[0].partner.logo.url}"
                            alt="logo"
                            class="img-fluid"
                            />
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                            <h3 class="card-title">{wellness[0].partner.company_name}</h3>
                            <p class="card-text">
                                {wellness[0].partner.description}
                            </p>
                            <!-- <small class="text-muted">email: <a href="mailto:{wellness[0].partner.email}">{wellness[0].partner.email}</a></small> -->
                            </div>
                            <p class="card-footer card-text">
                                <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + wellness[0].partner.slug)}>Read More</button>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2 justify-content-center">
                    {#each wellness as well}
                        <div class="col-sm-12 col-md-10 col-lg-6">
                            <div class="card bg-dark m-2 shadow-lg">
                                <img class="img-fluid rounded cta"  src="{well.banner.url}" alt="cover" on:click={() => goto('/auth/form-wellbeing')}>
                                <!-- <small class="text-white">Image by: David Travis, Unsplash.</small> -->
                                <div class="card-body">
                                    <h3 class="card-title text-logo-gold">Think <span class="text-lighter-blue">{well.name}</span></h3>
                                    <p class="card-text">
                                        {@html well.description}
                                    </p>
                                    {#if readMore}
                                        <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => readMore=false}>Read less</button><br><br>
                                        <p style="text-align: justify;"> <SvelteMarkdown {source} /></p>
                                    {:else}
                                        <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => readMore=true}>Read more</button>
                                    {/if}
                                </div>
                                <div class="card-footer">
                                    <span class="badge bg-light">{well.partner.company_name}</span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

        <!-- MedicalAid -->
            <div class="grey-grad row justify-content-center big-gap" id="MedicalAid">
                <h2 class="display-3">Medical Aid</h2>
                <div class="col-6 mt-3">
                    <div class="card mb-3 bg-dark mx-auto" style="max-width: 540px;">
                        <div class="row g-0">
                        <div class="col-md-5">
                            <img
                            src="{health[0].partner.logo.url}"
                            alt="logo"
                            class="img-fluid"
                            />
                        </div>
                        <div class="col-md-7">
                            <div class="card-body">
                            <h3 class="card-title">{health[0].partner.company_name}</h3>
                            <p class="card-text">
                                {health[0].partner.description}
                            </p>
                            <!-- <small class="text-muted">email: <a href="mailto:{health[0].partner.email}">{health[0].partner.email}</a></small> -->
                            </div>
                            <p class="card-footer card-text">
                                <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + health[0].partner.slug)}>Read More</button>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2 justify-content-center">
                    {#each health as heal}
                        <div class="col-sm-12 col-md-10 col-lg-6">
                            <div class="card bg-dark m-2 shadow-lg">
                                <img class="img-fluid rounded cta"  src="{heal.banner.url}" alt="cover" on:click={() => goto('/auth/form-medical-aid')}>
                                <div class="card-body">
                                    <h3 class="card-title text-logo-gold">Think <span class="text-lighter-blue">{heal.name}</span></h3>
                                    <p class="card-text">
                                        {@html heal.description}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <span class="badge bg-light">{heal.partner.company_name}</span>
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
    .text-lighter-blue{
        color: rgb(243, 243, 243);
    }
</style>