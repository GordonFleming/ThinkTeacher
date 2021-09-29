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
            error = e
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
                    <div class="card border-dark bg-dark text-black mb-3">
                        <h3 class="card-header">{partner.name}</h3>
                        <img class="img-fluid center" src="http://localhost:1337{partner.image.url}" alt="cover">
                        <div class="card-body">
                          <p class="card-text">{@html snarkdown(partner.bio)}</p>
                        </div>
                        <div class="card-footer border-dark text-muted">
                            <span class="badge bg-dark">{partner.category.name}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}


</div>

<style>
    span{
        font-size: 1.1em;
    }
    .center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>