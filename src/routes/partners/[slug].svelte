<script context="module">
	import { API_URL } from "$lib/env.js";

	export async function load({ params, fetch }) {
		const { slug } = params;
		const res = await fetch(`${API_URL}/partners?slug=${slug}`);
		const data = await res.json();
		console.log("something??", data);

		if (data.length > 0) {
			return { props: { partner: data[0] } };
		}

		const error = new Error(`The partner with slug of ${slug} was not found`);
		return { status: res.status, error: error };
	}
</script>

<script>
	import Icon from "$lib/Icons/icon.svelte";
	import { arrowLeft } from "$lib/Icons/icons";
	import SvelteMarkdown from "svelte-markdown";
	import { onMount } from "svelte";
	import { travelScroll } from "$lib/stores";

	export let partner;
	let source;
	if (partner) source = partner.bio;

	let extraImage = false;
	onMount(() => {
		partner.custom.length > 0 ? (extraImage = true) : (extraImage = false);
	});
</script>

<svelte:head>
	<title>{partner.name}</title>
</svelte:head>

<div class="container bg-dark mt-4 border-custom mt-5 mb-5">
	<a sveltekit:prefetch href="/partners"><Icon data={arrowLeft} scale="3" /></a>
	{#if extraImage}
		<div class="row">
			<div class="col-sm-12 col-md-6" style="text-align: right;">
				<img
					class="img-fluid mt-2"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/{partner.image
						.hash}{partner.image.ext}"
					alt="Partner"
				/>
			</div>
			<div class="col-sm-12 col-md-6">
				<img
					class="img-fluid justify-content-start mt-2"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/{partner.custom[0]
						.extraImage.formats.small.hash}{partner.custom[0].extraImage.formats.small
						.ext}"
					alt="Partner"
				/>
			</div>
		</div>
	{:else}
		<img
			class="img-fluid mx-auto d-block mt-2"
			src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/{partner.image
				.hash}{partner.image.ext}"
			alt="Partner"
		/>
	{/if}

	<h2 class="text-center mt-3">{partner.name}</h2>
	<h4 class="text-center text-white">{partner.description}</h4>

	<div id="mark-down">
		<SvelteMarkdown {source} />
	</div>

	<div class="text-center mt-4">
		<a href="/benefits"
			><button
				class="btn bg-gold shadow cta text-black fs-5 p-1"
				on:click={() => ($travelScroll = partner.category.name)}>Enquire</button
			></a
		>
	</div>
</div>

<style>
	img {
		max-height: 295px;
		width: auto;
	}
	.container {
		border-radius: 20px;
	}
	@media screen and (max-width: 1000px) {
		.container {
			padding: 1rem;
		}
	}

	@media screen and (min-width: 999px) {
		.container {
			padding: 5rem;
		}
	}
	.border-custom {
		border-top: 3px solid var(--logo-gold);
		border-left: 3px solid var(--logo-gold);

		border-bottom: 3px solid var(--logo-grey);
		border-right: 3px solid var(--logo-grey);
	}
</style>
