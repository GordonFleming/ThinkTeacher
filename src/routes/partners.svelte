<script>
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import snarkdown from 'snarkdown'

    const API_URL = 'http://localhost:1337/partners'
    let loading = true

    let partners

    onMount(async () => {
        try {
            const res = await axios.get(API_URL)
            partners = res.data
            loading = false
            console.log(partners)
        } catch (e) {
            const error = e
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
                <!-- <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="card border-dark bg-dark text-black mb-3">
                        <h3 class="card-header bg-light">{partner.name}</h3>
                        <img class="img-fluid center" src="http://localhost:1337{partner.image.url}" alt="cover">
                        <div class="card-body">
                          <p class="card-text">{@html snarkdown(partner.bio)}</p>
                        </div>
                        <div class="card-footer border-dark text-muted">
                            <span class="badge bg-dark">{partner.category.name}</span>
                        </div>
                    </div>
                </div> -->
                <div class="col-sm-12 col-md-6 col-lg-4">
                    <div class="card bg-dark mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img class="img-fluid" src="http://localhost:1337{partner.image.url}" alt="cover">
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
    /* img{
        max-height: 160px;
        width: auto;
    } */
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
</style>