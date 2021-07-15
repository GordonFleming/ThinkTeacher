<script context="module">
	export const load = async ({ page: { params }, fetch }) => {
		// The params object will contain all of the parameters in the route.
		const { slug } = params
		// Now, we'll fetch the blog post from Strapi
		const res = await fetch('http://localhost:1337/posts/' + slug)
		// A 404 status means "NOT FOUND"
		if (res.status === 404) {
			// We can create a custom error and return it.
			// SvelteKit will automatically show us an error page that we'll learn to customise later on.
			const error = new Error(`The post with ID ${slug} was not found`)
			return { status: 404, error }
		} else {
			const data = await res.json()
			return { props: { post: data } }
		}
	};
</script>

<script>
    import snarkdown from 'snarkdown'
    import Icon from 'svelte-awesome'
    import { arrowLeft } from 'svelte-awesome/icons'

	export let post
    let date = new Date(post.published_at)
    let publish = date.toLocaleString('en-ZA', { month: 'long', day: '2-digit', year: 'numeric'})
    
    let mdContent = snarkdown(post.content)
</script>

<div class="container bg-dark mt-4">
    <a href="/blog"><Icon data={ arrowLeft } scale="1.8"/></a>
    <img class="img-fluid mx-auto d-block mt-2" src='http://localhost:1337{post.image.url}' alt="Blog banner">

    <h1 class="text-center">{post.title}</h1>
    <h3 class="text-center bg-dark">{post.description}</h3>

    <h5>Author: {post.author.username}</h5>
    <time datetime="{publish}">{publish}</time>  
    
    {@html mdContent}
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
</style>
