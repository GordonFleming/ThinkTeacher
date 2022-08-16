<script>
	import Icon from "$lib/Icons/icon.svelte";
	import { arrowLeft } from "$lib/Icons/icons";
	import SvelteMarkdown from "svelte-markdown";
	import { onMount } from "svelte";
	import { travelScroll } from "$lib/stores";

	export let data;
	let { partner } = data;
	let source;
	if (partner) source = partner.bio;

	let extraImage = false,
		webinar = false;
	onMount(() => {
		if (partner.custom[0]) {
			partner.custom[0].extraImage !== undefined ? (extraImage = true) : (extraImage = false);
			partner.custom[0].url !== undefined ? (webinar = true) : (webinar = false);
		}
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

	{#if webinar}
		<h4 class="text-logo-gold">Webinar:</h4>
		<div class="col-lg-6 col-md-12 mt-2">
			<div class="webinar-wrapper">
				<div class="frame-wrapper">
					<iframe
						src={partner.custom[0].url}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				</div>
			</div>
		</div>
	{/if}

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
		border: 3px solid var(--logo-gold);
	}
	iframe {
		position: absolute;
		max-width: 800px;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.frame-wrapper {
		position: relative;
		padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
		overflow: hidden;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	.webinar-wrapper {
		padding: 3%;
		position: relative;
		background-color: var(--logo-grey);
		border-radius: 5px;
		border: 3px solid var(--logo-gold);
		height: 100%;
	}
</style>
