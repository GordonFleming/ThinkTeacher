<script context="module">
	import { API_URL } from "$lib/env.js";

	export async function load({ params, fetch }) {
		const { slug } = params;
		const res = await fetch(`${API_URL}/posts?slug=${slug}`);
		const data = await res.json();

		if (data.length > 0) {
			return { props: { post: data[0] } };
		}

		const error = new Error(`The blog with slug of ${slug} was not found`);
		return {
			status: res.status,
			error: error,
		};
	}
</script>

<script>
	import Icon from "$lib/Icons/icon.svelte";
	import { arrowLeft } from "$lib/Icons/icons";
	import SvelteMarkdown from "svelte-markdown";

	export let post;
	let date;
	let publish;
	let source;

	if (post) {
		date = new Date(post.published_at);
		publish = date.toLocaleString("en-ZA", { month: "long", day: "2-digit", year: "numeric" });
		source = post.content;
	}
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="container bg-dark mt-4 border-custom mb-5">
	<a sveltekit:prefetch href="/blog"><Icon data={arrowLeft} scale="3" /></a>
	<img
		class="img-fluid mx-auto d-block mt-2"
		src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/{post.image.hash}{post.image
			.ext}"
		alt="Blog banner"
	/>

	<h1 class="text-center">{post.title}</h1>
	<h4 class="text-center text-white">{post.description}</h4>

	<h5 class="mt-5">Author: {post.Author}</h5>
	{#if post.source_url}
		<a href={post.source_url} target="_blank">{post.source_url}</a><br />
	{/if}
	<time datetime={publish}>{publish}</time>

	<div id="mark-down">
		<SvelteMarkdown {source} />
	</div>
</div>

<style>
	img {
		max-height: 400px;
		width: auto;
	}
	h1 {
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
