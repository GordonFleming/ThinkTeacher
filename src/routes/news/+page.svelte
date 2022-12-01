<script>
    import { goto } from "$app/navigation";
    import Title from "$lib/Components/Title.svelte";

    export let data;

    let { posts } = data;
</script>

<svelte:head>
    <title>News Flash | ThinkTeacher</title>
    <meta
        name="description"
        content="View all sorts of news flash posts, written by Teachers for teachers!"
    />
</svelte:head>

<div class="container mx-auto mb-5">
    <Title title={"news flashes"} />

    {#if posts.length <= 0}
        <h3 class="text-center">Coming Soon!</h3>
    {:else}
        <div class="row justify-content-center">
            {#each posts as post}
                <div class="col-sm-12 col-md-6 col-lg-4 text-center mt-3">
                    <a data-sveltekit-preload-data href="/news/{post.attributes.slug}">
                        <div class="news-block bg-dark p-3">
                            <h4 class="font-bold">{post.attributes.title}</h4>
                            <button
                                class="btn btn-sm bg-gold  shadow cta text-black"
                                on:click={() => goto(`/news/${post.attributes.slug}`)}
                                >Read More</button
                            >
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    a {
        text-decoration: none;
    }
    h4 {
        color: #fff;
    }
    .news-block {
        border-radius: 20px;
        border: 3px solid var(--logo-gold);
    }
    .news-block:hover {
        cursor: pointer;
        border: 3px solid var(--logo-grey);
    }
</style>
