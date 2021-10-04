<script context="module">
    import { prod } from '$lib/env.js'
    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

	export const load = async ({ page: { params }, fetch }) => {
		const { slug } = params
		const res = await fetch(`${API_URL}/posts?slug=` + slug)

		if (res.status === 404) {
			const error = new Error(`The post with slug of ${slug} was not found`)
			return { status: 404, error }
		} else {
			const data = await res.json()
			return { props: { post: data[0] } }
		}
	};
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<script>
    import snarkdown from 'snarkdown'
    import Icon from 'svelte-awesome'
    import { arrowLeft } from 'svelte-awesome/icons'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    export let post
    let date = new Date(post.published_at)
    let publish = date.toLocaleString('en-ZA', { month: 'long', day: '2-digit', year: 'numeric'})
    
    let mdContent = snarkdown(post.content)
</script>

<div class="container bg-dark mt-4 border-custom">
    <a href="/blog"><Icon data={ arrowLeft } scale="1.8"/></a>
    <img class="img-fluid mx-auto d-block mt-2" src='{API_URL}{post.image.url}' alt="Blog banner">

    <h1 class="text-center">{post.title}</h1>
    <h3 class="text-center bg-dark">{post.description}</h3>

    <h5>Author: {post.author.username}</h5>
    <time datetime="{publish}">{publish}</time>  
    
    <p class="mt-4">{@html mdContent}</p>
</div>

<style>
    img {
        max-height: 400px;
        width: auto;
    }
    h3 {
        color: #fff;
    }
    h5 {
        color: chocolate;
        line-height: 0;
    }
    time {
        color: #fff;
    }
    .container {
        border-radius: 20px;
        padding: 5rem;
    }
    p{
        color: #fff;
    }
    .border-custom{
        border-top: 3px solid var(--logo-blue);
        border-left: 3px solid var(--logo-blue);

        border-bottom: 3px solid var(--logo-orange);
        border-right: 3px solid var(--logo-orange);
            }
</style>
