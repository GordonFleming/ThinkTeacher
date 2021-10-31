<script context="module">
	export const load = async ({ page: { params }, fetch }) => {
		const { slug } = params
		const res = await fetch('https://thinkteacher-strapi.glass.splyce.dev/partners?slug=' + slug)

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
    {#if partner}
	    <title>{partner.name}</title>
    {:else}
        <title>404</title>
    {/if}
</svelte:head>

<script>
    import Icon from 'svelte-awesome'
    import { arrowLeft } from 'svelte-awesome/icons'
    import { prod } from '$lib/env.js'
    import SvelteMarkdown from 'svelte-markdown'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    export let partner
    let source
    if(partner) source = partner.bio
</script>

{#if partner}
    <div class="container bg-dark mt-4 border-custom mt-5 mb-5">
        <a href="/partners"><Icon data={ arrowLeft } scale="1.8"/></a>
        <img class="img-fluid mx-auto d-block mt-2" src='{partner.image.url}' alt="Partner">

        <h2 class="text-center mt-3">{partner.name}</h2>
        <h4 class="text-center text-white">{partner.description}</h4>

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
