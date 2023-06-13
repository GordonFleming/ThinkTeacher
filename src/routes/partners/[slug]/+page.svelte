<script>
    import Icon from "$lib/Icons/icon.svelte";
    import { arrowLeft } from "$lib/Icons/icons";
    import SvelteMarkdown from "svelte-markdown";
    import { goto } from "$app/navigation";

    export let data;
    let { partner } = data;
    let source;
    if (partner) source = partner.bio;
</script>

<svelte:head>
    <title>{partner.name} | ThinkTeacher</title>
</svelte:head>

<div class="container bg-dark mt-4 border-custom mt-5 mb-5">
    <a data-sveltekit-preload-data href="/partners"><Icon data={arrowLeft} scale="3" /></a>
    <div class="row justify-content-center">
        {#each partner.images.data as img}
            <div class="col-sm-12 col-md-6">
                <img
                    class="img-fluid mx-auto d-block mt-2"
                    src={"https://wsrv.muse.splyce.dev/?url="+
                    img.attributes.url+
                    "&w=400&h=400&output=webp"}
                    alt="Partner"
                />
            </div>
        {/each}
    </div>

    <h2 class="text-center mt-3">{partner.name}</h2>
    <h4 class="text-center text-white">{partner.description}</h4>

    {#if partner.webinar}
        <h4 class="text-logo-gold">Webinar:</h4>
        <div class="col-lg-6 col-md-12 mt-2">
            <div class="webinar-wrapper">
                <div class="frame-wrapper">
                    <iframe
                        src={partner.webinar}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    />
                </div>
            </div>
        </div>
    {/if}

    <div id="mark-down">
        <SvelteMarkdown {source} />
    </div>

    <div class="text-center mt-4">
        <button
            class="btn bg-gold shadow cta text-black fs-5 p-1"
            on:click={() => goto(`/benefits/${partner.category.data.attributes.name}`)}
            >Enquire</button
        >
    </div>
</div>

<style>
    img {
        max-height: 295px;
        width: auto;
    }
    .container {
        border-radius: 20px;
    }
    @media screen and (max-width: 1000px) {
        .container {
            padding: 1rem;
        }
    }

    @media screen and (min-width: 999px) {
        .container {
            padding: 5rem;
        }
    }
    .border-custom {
        border: 3px solid var(--logo-gold);
    }
    iframe {
        position: absolute;
        max-width: 800px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .frame-wrapper {
        position: relative;
        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .webinar-wrapper {
        padding: 3%;
        position: relative;
        background-color: var(--logo-grey);
        border-radius: 5px;
        border: 3px solid var(--logo-gold);
        height: 100%;
    }
</style>
