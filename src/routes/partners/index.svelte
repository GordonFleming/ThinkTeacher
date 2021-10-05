<script>
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import snarkdown from 'snarkdown'
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

<div class="container">
    <h1 class="text-center">Our Partners</h1>

    {#if loading}
        <div class="d-flex justify-content-center mt-5">
            <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
        </div>
    {:else}
        <div class="row">
            {#each partners as partner}
            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="card bg-dark mb-3 shadow-lg">
                    <img class="img-fluid rounded"  src="http://localhost:1337{partner.logo.url}" alt="cover">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">
                            {partner.description}
                        </p>
                        <a href="#!" class="btn btn-secondary">Button</a>
                    </div>
                    <div class="card-footer">
                        <span class="badge bg-light">{partner.category.name}</span>
                    </div>
                </div>
            </div>
                <!-- <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="card bg-dark mb-3 shadow-lg p-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img class="img-fluid" style="height: auto; width: auto; max-width: 200px; max-height: 260px;" src="http://localhost:1337{partner.logo.url}" alt="cover">
                                <span class="badge bg-light">{partner.category.name}</span>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{partner.name}</h5>
                                    <p class="card-text">
                                        {partner.description}
                                    </p>
                                    <p class="card-text">
                                        <small class="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
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
</style>