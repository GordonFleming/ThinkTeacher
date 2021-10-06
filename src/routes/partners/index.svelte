<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation'
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let loading = true
    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let partners

    onMount(async () => {
        try {
            const res = await axios.get(`${API_URL}/partners`)
            partners = res.data
            loading = false
            console.log(partners)
        } catch (e) {
            let error = e
            console.log(error)
        }
	});
</script>

<svelte:head>
	<title>Partners</title>
</svelte:head>

<div class="container mb-5">
    <h1 class="text-center mb-4">Our Partners</h1>

    {#if loading}
        <div class="d-flex justify-content-center mt-5">
            <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
        </div>
    {:else}
        <div class="row justify-content-center">
            {#each partners as partner}
            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="card bg-dark m-2 shadow-lg" on:click={() => goto('/partners/' + partner.slug)}>
                    <img class="img-fluid rounded"  src="{partner.logo.url}" alt="cover">
                    <div class="card-body">
                        <h5 class="card-title">{partner.name}</h5>
                        <p class="card-text">
                            {partner.description}
                        </p>
                    </div>
                    <div class="card-footer">
                        <span class="badge bg-light">{partner.category.name}</span>
                    </div>
                </div>
            </div>

            {/each}
        </div>
    {/if}

    <!-- Possible future adjustment -->

        <!-- <h2>Travel</h2>
        {#each categories as category}
            {#if category.name === 'travel'}
                {category.name}
            {/if}
        {/each}

        <h2>Legal</h2>

        <h2>Health</h2> -->

</div>

<style>
    span{
        font-size: 1.1em;
    }
    .badge{
        margin: 1rem;
    }
    .card{
        transition: 0.4s;
        cursor: pointer;
    }
    .card:hover{
        transform: scale(1.02);
    }
</style>