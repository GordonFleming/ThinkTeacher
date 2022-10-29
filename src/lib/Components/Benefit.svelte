<script>
    import { goto } from "$app/navigation";
    import { travelType, courseType } from "$lib/stores";

    export let benefitData;

    function redirectPlusDataCompute(type) {
        switch (benefitData[0].attributes.partner.data.attributes.company_name.toLowerCase()) {
            case "cirrus travel":
                $travelType = type.toLowerCase().replace(" ", "_");
                goto("/auth/form/travel");
                break;
            case "macmillan":
                $courseType = type;
                goto("/auth/form/courses");
                break;
            case "kim forbes":
                goto("/auth/form/wellbeing");
                break;
            case "sa health brokers (pty) ltd":
                goto("/auth/form/medical-aid");
                break;
            case "alexander forbes":
                goto("/auth/form/finance");
                break;
            case "stephen g. may":
                goto("/auth/form/legal");
                break;
            case "kia":
                goto("/auth/form/cars");
                break;
            default:
                goto("/");
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
                        on:click={() => redirectPlusDataCompute(benData.attributes.name)}
                        on:keydown={() => redirectPlusDataCompute(benData.attributes.name)}
                    />
                    <div class="card-body">
                        <h3 class="card-title text-logo-gold text-lowercase">
                            think<span class="text-white">{benData.attributes.name}</span>
                        </h3>
                        <p class="card-text">
                            {@html benData.attributes.description}
                        </p>
                        <button
                            class="btn bg-gold shadow cta text-black fs-5 p-1"
                            on:click={() => redirectPlusDataCompute(benData.attributes.name)}
                            >Enquire</button
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
