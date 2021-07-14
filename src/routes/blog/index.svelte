<script>
	import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import axios from 'axios';

    const API_URL = 'http://localhost:1337/posts';

    onMount(async () => {
        try {
            const res = await axios.get(API_URL);
            posts = res.data
            console.log(posts)
        } catch (e) {
            error = e
        }
	});


	let posts = [];
</script>

<div class="my-4">
	<h1 class="text-center text-3xl font-bold">ThinkTeacher Blog</h1>
</div>

<div class="container mx-auto mt-4">
    {#if posts.length <= 0}
        <h3 class="text-center">No posts are on the blog yet, check back another time.</h3>
    {:else}
        <div class="row">
            {#each posts as post}
                <div class="col-sm-12 col-md-6 col-lg-4 text-center">
                    <div class="blog-block bg-dark p-3" on:click={() => goto('/blog/' + post.id)}>
                        <h4 class="font-bold">{post.Title}</h4>
                        <p class="mt-2 text-white">{post.Description}</p>
                        <p class="text-white-50">By: {post.author.username}</p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .blog-block {
        border-radius: 20px;
        border: 3px solid var(--logo-blue);
    }
    .blog-block:hover {
        cursor: pointer;
        border: 3px solid var(--logo-orange);
    }
</style>