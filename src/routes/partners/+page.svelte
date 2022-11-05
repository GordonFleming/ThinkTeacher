<script>
    import { goto, prefetch } from "$app/navigation";
    import Title from "$lib/Components/Title.svelte";

    export let data;
    let { partners } = data;
</script>

<svelte:head>
    <title>Partners</title>
    <meta name="description" content="View ThinkTeacher's great partners!" />
</svelte:head>

<div class="container mb-5">
    <Title title={"partners"} />

    <div class="row justify-content-center">
        {#each partners as partner}
            <div class="col-sm-12 col-md-6 col-lg-4">
                <div class="card bg-dark m-2 shadow-lg">
                    <a data-sveltekit-prefetch href={`/partners/${partner.attributes.slug}`}>
                        <img
                            class="img-fluid rounded cta"
                            src={partner.attributes.logo.data.attributes.url}
                            alt="cover"
                        />
                    </a>

                    <div class="card-body">
                        <h5 class="card-title">{partner.attributes.company_name}</h5>
                        <p class="card-text">
                            {partner.attributes.description}
                        </p>
                        <button
                            class="btn-sm btn bg-gold mx-auto shadow cta"
                            on:mouseenter={() => prefetch(`/partners/${partner.attributes.slug}`)}
                            on:click={() => goto(`/partners/${partner.attributes.slug}`)}
                            >Read More</button
                        >
                    </div>
                    <div class="card-footer">
                        <a
                            data-sveltekit-prefetch
                            href="/benefits/{partner.attributes.category.data.attributes.name}"
                            ><span class="badge bg-light"
                                >{partner.attributes.category.data.attributes.name.replace(
                                    "_",
                                    " "
                                )}</span
                            ></a
                        >
                    </div>
                </div>
            </div>
        {/each}

        <div class="mt-4 text-center">
            <button
                class="btn btn-lg bg-gold mx-auto shadow-lg cta"
                style="width: 300px;"
                on:click={() => goto("/benefits")}
                ><h4 class="text-black mt-2">Check their benefits</h4></button
            >
            <p class="mt-3">
                Interested in being a ThinkTeacher partner? Contact <a
                    href="mailto:bridget@thinkteacher.co.za">bridget@thinkteacher.co.za</a
                >.
            </p>
        </div>
    </div>
</div>

<style>
</style>
