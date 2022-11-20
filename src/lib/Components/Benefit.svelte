<script>
    import { goto } from "$app/navigation";
    import { benType } from "$lib/stores";

    export let benefitData;
    let category = benefitData[0].attributes.partner.data.attributes.category.data.attributes.name;
    function redirect(type) {
        // reset the benType
        $benType = "";
        if (category) {
            goto(`/auth/form/${category.replace("_", "-")}`);
            $benType = type;
        } else {
            goto("/404");
        }
    }
</script>

{#if benefitData.length > 0}
    <div class="row mt-2 justify-content-center">
        {#each benefitData as benData}
            <div class="col-sm-12 col-md-10 col-lg-6">
                <div class="card bg-dark m-2 shadow-lg">
                    <img
                        class="img-fluid rounded cta"
                        src={benData.attributes.banner.data.attributes.url}
                        alt="cover"
                        on:click={() => redirect(benData.attributes.name)}
                        on:keydown={() => redirect(benData.attributes.name)}
                    />
                    <div class="card-body">
                        <h3 class="card-title text-logo-gold text-lowercase">
                            think<span class="text-white"
                                >{benData.attributes.name.replace(" ", "")}</span
                            >
                        </h3>
                        <p class="card-text">
                            {@html benData.attributes.description}
                        </p>
                        <button
                            class="btn bg-gold shadow cta text-black fs-5 p-1"
                            on:click={() => redirect(benData.attributes.name)}>Enquire</button
                        >
                    </div>
                    <div class="card-footer">
                        <span class="badge bg-light"
                            >{benData.attributes.partner.data.attributes.company_name}</span
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
{:else}
    <h4>No packages yet.</h4>
{/if}

<style>
    .card {
        height: 92%;
        padding: 3%;
    }
</style>
