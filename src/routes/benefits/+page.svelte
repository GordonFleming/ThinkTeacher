<script>
    import Title from "$lib/Components/Title.svelte";
    import { onMount } from "svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import { toastSuc } from "$lib/env.js";

    onMount(async () => {
        // read url params and display toast
        const urlParams = new URLSearchParams(window.location.search);
        const payment = urlParams.get("success");
        if (payment === "true") {
            toast.push("Payment successful!", toastSuc);
            window.history.replaceState({}, document.title, "/benefits");
        }
    });

    export let data;
    let { benefits } = data;
</script>

<svelte:head>
    <title>Benefits | ThinkTeacher</title>
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
                <a href="/benefits/{benefit.attributes.name}">
                    <div class="placeholder">
                        <img
                            class="img-fluid offer offer-img rounded-1"
                            src={
                            "https://wsrv.muse.splyce.dev/?url="+
                            benefit.attributes.img.data.attributes.url+
                            "&w=300&h=300&output=webp"}
                            alt="well being"
                        />
                    </div>
                </a>
                <h3 class="text-lowercase text-blue">
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
