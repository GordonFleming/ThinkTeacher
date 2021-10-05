<script context="module">
	export const load = async ({ page: { params }, fetch }) => {
		const { slug } = params
		const res = await fetch('http://localhost:1337/partners?slug=' + slug)

		if (res.status === 404) {
			const error = new Error(`The partner with slug of ${slug} was not found`)
			return { status: 404, error }
		} else {
			const data = await res.json()
			return { props: { partner: data[0] } }
		}
	};
</script>

<svelte:head>
	<title>{partner.name}</title>
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

    export let partner
    
    let mdBio = snarkdown(partner.bio)
</script>

<div class="container bg-dark mt-4 border-custom mt-5 mb-5">
    <a href="/blog"><Icon data={ arrowLeft } scale="1.8"/></a>
    <img class="img-fluid mx-auto d-block mt-2" src='{API_URL}{partner.image.url}' alt="Blog banner">

    <h1 class="text-center">{partner.name}</h1>
    <h4 class="text-center text-white">{partner.description}</h4>

    <p class="mt-4">{@html mdBio}</p>
</div>

<style>
    img {
        max-height: 400px;
        width: auto;
    }
    h5 {
        color: chocolate;
        line-height: 0;
    }
    .container {
        border-radius: 20px;
        padding: 5rem;
    }
    p{
        color: #fff;
        text-align: justify;
    }
    .border-custom{
        border-top: 3px solid var(--logo-blue);
        border-left: 3px solid var(--logo-blue);

        border-bottom: 3px solid var(--logo-orange);
        border-right: 3px solid var(--logo-orange);
            }
</style>
