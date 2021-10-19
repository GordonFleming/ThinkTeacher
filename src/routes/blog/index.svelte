<script>
	import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let loading = true

    onMount(async () => {
        try {
            const res = await axios.get(`${API_URL}/posts`)
            posts = res.data
            loading = false
            console.log(posts)
        } catch (e) {
            error = e
        }
	});


	let posts = [];
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="my-4">
	<h1 class="text-center text-3xl font-bold">ThinkTeacher Blog</h1>
</div>

<div class="container mx-auto mt-4 mb-5">
    {#if loading}
        <div class="d-flex justify-content-center mt-5">
            <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
        </div>
    {/if}
    {#if posts.length <= 0 && !loading}
        <h3 class="text-center">No posts are on the blog yet, check back another time.</h3>
    {:else}
        <div class="row justify-content-center">
            {#each posts as post}
                <div class="col-sm-12 col-md-6 col-lg-4 text-center mt-3">
                    <div class="blog-block bg-dark p-3" on:click={() => goto('/blog/' + post.slug)}>
                        <h4 class="font-bold">{post.title}</h4>
                        <p class="mt-2 text-white">{post.description}</p>
                        <p class="text-white-50">By: {post.Author}</p>
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