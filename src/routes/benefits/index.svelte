<script  context="module">
    import { prod } from '$lib/env.js'
    
    let API_URL = 'http://localhost:1337'
    let health_cat = 3, travel_cat = 2, course_cat = 5, wellbeing_cat = 4
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
        health_cat = 2, travel_cat = 1, course = 6, wellbeing = 3
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

        let packages = [], travel = [], health = [], wellness = [], courses=[], source

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
                }
            } 

            packages.forEach(seperatePackages)

            return { props: { travel, health, wellness, courses, source} }
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
    import { travelScroll, travelType, courseType } from '$lib/stores'
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

    export let travel = [], wellness = [], health = [], courses = []

    function travelTypeCompute(typeTrav){
        $travelType = typeTrav.toLowerCase().replace(" ","_");
        goto('/auth/form-travel')
    }

    function courseTypeCompute(crsType){
        $courseType = crsType;
        goto('/auth/form-courses')
    }

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
        <li class="list-inline-item"><h4 on:click={() => document.getElementById('insurance').scrollIntoView({ behavior: 'smooth', block: 'center' })}>Insurance <span class="text-logo-gold">-</h4></li>
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
                                <button class="btn bg-gold shadow cta text-black fs-5 p-1" on:click={() => travelTypeCompute(trvl.name)}>Enquire</button>
                            </div>
                            <div class="card-footer">
                                <span class="badge bg-light">{trvl.partner.company_name}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <h4 class="mt-3">Our Partner:</h4>
        <div class="col-8">
            <div class="mb-3 mx-auto" style="max-width: 540px;">
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
                        <h3 class="text-black">{travel[0].partner.company_name}</h3>
                        <p class="text-black">
                            {travel[0].partner.description}
                        </p>
                        <div class="border-bottom border-dark border-1 mb-2"></div>
                        <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + travel[0].partner.slug)}>Read More</button>
                    </div>
                </div>
                </div>
            </div>
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

            <h4 class="mt-3">Our Partner:</h4>
            <div class="col-8">
                <div class="mb-3 mx-auto" style="max-width: 540px;">
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
                            <h3 class="text-black">{wellness[0].partner.company_name}</h3>
                            <p class="text-black">
                                {wellness[0].partner.description}
                            </p>
                            <div class="border-bottom border-dark border-1 mb-2"></div>
                            <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + wellness[0].partner.slug)}>Read More</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MedicalAid -->
        <div class="grey-grad row justify-content-center big-gap" id="medical_aid">
            <h2 class="display-3">Medical Aid</h2>
            
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

            <h4 class="mt-3">Our Partner:</h4>
            <div class="col-8">
                <div class="mb-3 mx-auto" style="max-width: 540px;">
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
                            <h3 class="text-black">{health[0].partner.company_name}</h3>
                            <p class="text-black">
                                {health[0].partner.description}
                            </p>
                            <div class="border-bottom border-dark border-1 mb-2"></div>
                            <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + health[0].partner.slug)}>Read More</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Legal -->
        <div class="grey-grad row justify-content-center big-gap" id="legal">
            <h2 class="display-3">Legal</h2>
            <h4>Nearly there...</h4>
        </div>

        <!-- Courses -->
        <div class="grey-grad row justify-content-center big-gap" id="courses">
            <h2 class="display-3">Courses</h2>

            <div class="row mt-2 justify-content-center">
                {#each courses as cors}
                    <div class="col-sm-12 col-md-10 col-lg-6">
                        <div class="card bg-dark m-2 shadow-lg">
                            <img class="img-fluid rounded cta"  src="{cors.banner.url}" alt="cover" on:click={()=> courseTypeCompute(cors.name)}>
                            <div class="card-body">
                                <h3 class="card-title text-logo-gold">Think <span class="text-lighter-blue">{cors.name}</span></h3>
                                <p class="card-text">
                                    {@html cors.description}
                                </p>
                            </div>
                            <div class="card-footer">
                                <span class="badge bg-light">{cors.partner.company_name}</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

            <h4 class="mt-3">Our Partner:</h4>
            <div class="col-8">
                <div class="mb-3 mx-auto" style="max-width: 540px;">
                    <div class="row g-0">
                    <div class="col-md-5">
                        <img
                        src="{courses[0].partner.logo.url}"
                        alt="logo"
                        class="img-fluid"
                        />
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h3 class="text-black">{courses[0].partner.company_name}</h3>
                            <p class="text-black">
                                {courses[0].partner.description}
                            </p>
                            <div class="border-bottom border-dark border-1 mb-2"></div>
                            <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + courses[0].partner.slug)}>Read More</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Insurance -->
        <div class="grey-grad row justify-content-center big-gap" id="insurance">
            <h2 class="display-3">Finance</h2>
            <h4>Nearly there...</h4>
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
    .card{
        height: 92%;
        padding: 3%;
    }
</style>