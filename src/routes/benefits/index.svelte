<script  context="module">
    import { prod } from '$lib/env.js'
    
    let API_URL = 'http://localhost:1337'
    let health_cat = 3, travel_cat = 2, course_cat = 5, wellbeing_cat = 4, finance_cat = 6
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
        health_cat = 2, travel_cat = 1, course_cat = 6, wellbeing_cat = 3, finance_cat = 5
    }

	export const load = async ({ fetch }) => {
        const endpoint = `${API_URL}/graphql`;
        const headers = {
            "content-type": "application/json",
        };
        const graphqlQuery = {
            "operationName": "fetchBenefits",
            "query": `query fetchBenefits {     
                packages {
                    name,
                    description,
                    partner {
                        company_name,
                        description,
                        category{
                            id,
                        },
                        logo{
                            url
                        },
                        slug
                    },
                    details,
                    banner{
                        url
                    }
                } 
            }`,
            "variables": {}
        };

        const options = {
            "method": "POST",
            "headers": headers,
            "body": JSON.stringify(graphqlQuery)
        };

        const res = await fetch(endpoint, options);

        let packages = [], travel = [], health = [], wellness = [], courses = [], finance = [], source

        if (res.ok) {
			const data = await res.json()
            packages = data.data.packages
            function seperatePackages(item){
                if(item.partner.category.id == travel_cat){
                    travel.push(item)
                }else if(item.partner.category.id == health_cat){
                    health.push(item)
                }else if(item.partner.category.id == wellbeing_cat){
                    wellness.push(item)
                    source = wellness[0].details
                }else if(item.partner.category.id == course_cat){
                    courses.push(item)
                }else if(item.partner.category.id == finance_cat){
                    finance.push(item)
                }
            } 

            packages.forEach(seperatePackages)

            return { props: { travel, health, wellness, courses, finance, source} }
		}

        return {
			status: res.status,
			error: new Error(`Could not load page`)
		};
	};
</script>

<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import { travelScroll } from '$lib/stores'
    import Benefit from '$lib/Components/Benefit.svelte';
    import PartnerBenefit from '$lib/Components/PartnerBenefit.svelte';
    import SvelteMarkdown from 'svelte-markdown'

    let navbar, sticky
    $: onMount(() => {
        document.body.scrollTop = 0;
        if($travelScroll){
            document.getElementById(`${$travelScroll}`).scrollIntoView({ block: 'center' })
        } 

        navbar = document.getElementById("nav-benefits");
        sticky = navbar.offsetTop;
	});

    export let travel, wellness, health, courses, finance

    export let source, readMore = false

    function stickYesNo() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky-top")
        } else {
            navbar.classList.remove("sticky-top");
        }
    }
</script>

<svelte:head>
	<title>Benefits</title>
</svelte:head>

<svelte:window on:scroll={stickYesNo}/>

<h1 class="text-center">Exclusive benefits for <span class="think">Think</span>Teacher members</h1>

<div class="text-center" id="nav-benefits">
    <ul class="list-inline">
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('travel').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Travel <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('wellbeing').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Wellbeing <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('medical_aid').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Medical Aid <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('legal').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Legal <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('courses').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Courses <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('finance').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Finance <span class="text-logo-gold">-</h4></li>
        <!-- <li class="list-inline-item"><h4 on:click={() => document.getElementById('Books').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Books <span class="text-logo-gold">-</span></h4></li> -->
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('photography').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Photography <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('IT').scrollIntoView({ behavior: 'smooth', block: 'center' })}>IT <span class="text-logo-gold">-</span></h4></li>
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('spa').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Spa</h4></li>
    </ul>
</div>

<div class="container text-center">
    <div class="row mt-4 mb-5 justify-content-center">
        <!-- Travel -->
        <div class="grey-grad row justify-content-center">
            <h2 id="travel" class="display-3">Travel</h2>

            <Benefit benefitData={travel} />

            <PartnerBenefit partnerData={travel} />
        </div>

        <!-- Wellbeing -->
        <div class="grey-grad row big-gap justify-content-center" id="wellbeing">
            <h2 class="display-3">Wellbeing</h2>
            
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

            <PartnerBenefit partnerData={wellness} />
        </div>



        <!-- MedicalAid -->
        <div class="grey-grad row justify-content-center big-gap" id="medical_aid">
            <h2 class="display-3">Medical Aid</h2>
            
            <Benefit benefitData={health} />

            <PartnerBenefit partnerData={health} />
        </div>

        <!-- Legal -->
        <div class="grey-grad row justify-content-center big-gap" id="legal">
            <h2 class="display-3">Legal</h2>
            <h4>Nearly there...</h4>
        </div>

        <!-- Courses -->
        <div class="grey-grad row justify-content-center big-gap" id="courses">
            <h2 class="display-3">Courses</h2>

            <Benefit benefitData={courses} />

            <PartnerBenefit partnerData={courses} />
        </div>

        <!-- Finance -->
        <div class="grey-grad row justify-content-center big-gap" id="finance">
            <h2 class="display-3">Finance</h2>

            <Benefit benefitData={finance} />

            <PartnerBenefit partnerData={finance} />
            <!-- <iframe src="https://retirements.digital.alexanderforbes.co.za/introduction/2/" title="My Retirement Picture" frameborder="0"></iframe> -->
        </div>

        <!-- Books -->
        <!-- <div class="grey-grad row justify-content-center big-gap" id="Books">
            <h2 class="display-3">Books</h2>
            <h4>Coming soon</h4>
        </div> -->
        
        <!-- Photography -->
        <div class="grey-grad row justify-content-center big-gap" id="photography">
            <h2 class="display-3">Photography</h2>
            <h4>Coming soon</h4>
        </div>
        <!-- IT -->
        <div class="grey-grad row justify-content-center big-gap" id="IT">
            <h2 class="display-3">IT</h2>
            <h4>Coming soon</h4>
        </div>
        <!-- Spa -->
        <div class="grey-grad row justify-content-center big-gap" id="spa">
            <h2 class="display-3">Spa</h2>
            <h4>Coming soon</h4>
        </div>
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