<script  context="module">
    import { prod } from '$lib/env.js'
    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

	export const load = async ({ fetch }) => {
        const res = await fetch(`${API_URL}/posts`)

        if (res.ok) {
			const data = await res.json()
            return { props: { posts: data } }
		}

        return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<script>
	import { goto } from '$app/navigation'

	export let posts
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="my-4">
	<h1 class="text-center text-3xl font-bold">ThinkTeacher Blog</h1>
</div>

<div class="container mx-auto mt-4 mb-5">
    {#if posts.length <= 0}
        <h3 class="text-center">No posts are on the blog yet, check back another time.</h3>
    {:else}
        <div class="row justify-content-center">
            {#each posts as post}
                <div class="col-sm-12 col-md-6 col-lg-4 text-center mt-3">
                    <div class="blog-block bg-dark p-3" on:click={() => goto('/blog/' + post.slug)}>
                        <h4 class="font-bold">{post.title}</h4>
                        <p class="mt-2 text-white">{post.description}</p>
                        <p class="text-logo-gold">By: {post.Author}</p>
                        <button class="btn btn-sm bg-gold  shadow cta text-black" on:click={() => goto('/blog/' + post.slug)}>Read More</button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    h4{
        color: #fff;
    }
    .blog-block {
        border-radius: 20px;
        border: 3px solid var(--logo-gold);
    }
    .blog-block:hover {
        cursor: pointer;
        border: 3px solid var(--logo-grey);
    }
</style>