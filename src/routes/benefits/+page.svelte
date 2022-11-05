<script>
    import Title from "$lib/Components/Title.svelte";

    export let data;

    let { benefits } = data;
</script>

<svelte:head>
    <title>Benefits</title>
    <meta name="description" content="View the many ThinkTeacher's great benefits!" />
</svelte:head>

<div class="container mb-5">
    <Title title={"benefits"} />

    <div class="row text-center justify-content-center">
        <h5 class="mb-5">
            Click on a benefit below to see what our partners can offer you as a ThinkTeacher member
        </h5>
        {#each benefits as benefit}
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <a href="benefits/{benefit.attributes.name}">
                    <div class="placeholder">
                        <img
                            class="img-fluid offer offer-img rounded-1"
                            src={benefit.attributes.img.data.attributes.url}
                            alt="well being"
                        />
                    </div>
                </a>
                <h3 class="text-lowercase mt-3 text-blue">
                    <span class="text-logo-gold">think</span>{benefit.attributes.name.replace(
                        "_",
                        ""
                    )}
                </h3>
            </div>
        {/each}
    </div>
</div>

<style>
    /* TODO */
    /* Make max height smaller for smaller screeens */
    .placeholder {
        height: 310px;
    }
    .offer-img {
        max-height: 300px;
    }
    .offer {
        transition: all 0.2s;
    }
    .offer:hover {
        transform: scale(1.05);
        cursor: pointer;
    }
</style>
