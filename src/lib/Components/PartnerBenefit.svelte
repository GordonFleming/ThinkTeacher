<script>
    import { goto } from '$app/navigation';

    export let partnerData
</script>

{#if partnerData.length > 0}
    <h4 class="mt-3">Our Partner:</h4>
    <div class="col-8">
        <div class="mb-3 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
            <div class="col-md-5">
                <img
                src="{partnerData[0].partner.logo.url}"
                alt="logo"
                class="img-fluid"
                />
            </div>
            <div class="col-md-7">
                <div class="card-body">
                    <h3 class="text-black">{partnerData[0].partner.company_name}</h3>
                    <p class="text-black">
                        {partnerData[0].partner.description}
                    </p>
                    <div class="border-bottom border-dark border-1 mb-2"></div>
                    <button class="btn btn-sm bg-gold shadow cta text-black" on:click={() => goto('/partners/' + partnerData[0].partner.slug)}>Read More</button>
                </div>
            </div>
            </div>
        </div>
    </div>
{:else}
    <h4>Partner will release their packages soon.</h4>
{/if}