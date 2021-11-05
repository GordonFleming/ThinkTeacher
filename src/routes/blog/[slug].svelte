<script  context="module">
    import { prod } from '$lib/env.js'
    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

	export const load = async ({ page: { params }, fetch }) => {
		const { slug } = params
        const res = await fetch(`${API_URL}/posts?slug=` + slug)

        if (res.ok) {
			const data = await res.json()
            return { props: { post: data[0] } }
		}

        return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	};
</script>

<svelte:head>
    {#if post}
        <title>{post.title}</title>
    {:else}
        <title>404</title>
    {/if}
</svelte:head>

<script>
    import Icon from 'svelte-awesome'
    import { arrowLeft } from 'svelte-awesome/icons'
    import SvelteMarkdown from 'svelte-markdown'

    export let post
    let date
    let publish
    let source

    if(post){
        date = new Date(post.published_at)
        publish = date.toLocaleString('en-ZA', { month: 'long', day: '2-digit', year: 'numeric'})
        source = post.content
    }
</script>

{#if post}
    <div class="container bg-dark mt-4 border-custom mb-5">
        <a href="/blog"><Icon data={ arrowLeft } scale="1.8"/></a>
        <img class="img-fluid mx-auto d-block mt-2" src='{post.image.url}' alt="Blog banner">

        <h1 class="text-center">{post.title}</h1>
        <h4 class="text-center text-white">{post.description}</h4>

        <h5 class="mt-5">Author: {post.Author}</h5>
        {#if post.source_url}
            <a sveltekit:prefetch href="{post.source_url}" target="_blank">{post.source_url}</a><br>
        {/if}
        <time datetime="{publish}">{publish}</time>  
        
        <div id="mark-down">
            <SvelteMarkdown {source} />
        </div>
    </div>
{:else}
    <div class="p-5 text-center">
        <h2>Not found: 404</h2>
    </div>
{/if}


<style>
    img {
        max-height: 400px;
        width: auto;
    }
    h1{
        color: var(--logo-gold);
    }
    h5 {
        color: var(--bg-banner);
        line-height: 0;
    }
    time {
        color: #fff;
    }
    .container {
        border-radius: 20px;
    }
    @media screen and (max-width: 1000px) {
        .container{
            padding: 1rem;
        }
    }

    @media screen and (min-width: 999px) {
        .container{
            padding: 5rem;
        }
    }

    .border-custom{
        border-top: 3px solid var(--logo-gold);
        border-left: 3px solid var(--logo-gold);

        border-bottom: 3px solid var(--logo-grey);
        border-right: 3px solid var(--logo-grey);
    }
</style>
