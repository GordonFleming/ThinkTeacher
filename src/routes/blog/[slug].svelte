<script context="module">
	export const load = async ({ page: { params }, fetch }) => {
		// The params object will contain all of the parameters in the route.
		const { slug } = params;
        console.log("This is slug: " + slug);
		// Now, we'll fetch the blog post from Strapi
		const res = await fetch('http://localhost:1337/posts/' + slug);
		// A 404 status means "NOT FOUND"
		if (res.status === 404) {
			// We can create a custom error and return it.
			// SvelteKit will automatically show us an error page that we'll learn to customise later on.
			const error = new Error(`The post with ID ${slug} was not found`);
			return { status: 404, error };
		} else {
			const data = await res.json();
			return { props: { post: data } };
		}
	};
</script>

<script>
	export let post;
    let date = new Date(post.published_at);
    let publish = date.toLocaleString('en-ZA', { month: 'long', day: '2-digit', year: 'numeric'}) 
</script>

<h1 class="text-center">{post.Title}</h1>

<img src='http://localhost:1337{post.image.url}' alt="Blog banner">

<p>{post.Content}</p>

<h3>Author: {post.author.username}</h3>

<time datetime="{publish}">{publish}</time>
