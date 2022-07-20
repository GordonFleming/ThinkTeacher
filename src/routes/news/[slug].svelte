<script context="module">
	import { API_URL } from "$lib/env.js";

	export async function load({ params, fetch }) {
		const { slug } = params;
		const res = await fetch(`${API_URL}/posts?slug=${slug}`);
		const data = await res.json();

		if (data.length > 0) {
			return { props: { post: data[0] } };
		}

		const error = new Error(`The news with slug of ${slug} was not found`);
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
	import { onMount } from "svelte";

	let PdfViewer;

	onMount(async () => {
		const module = await import("svelte-pdf");
		PdfViewer = module.default;
	});

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

<div class="container">
	<a sveltekit:prefetch href="/news"><Icon data={arrowLeft} scale="3" fill="#4F5D89" /></a>
	<h1 class="text-center mb-4" style="margin-top: 0;">{post.title}</h1>

	<div class="text-center">
		<svelte:component
			this={PdfViewer}
			scale="1.4"
			showBorder="false"
			showButtons="false"
			url={post.pdf.url}
		/>
	</div>

	<time datetime={publish}>{publish}</time>

	<div id="mark-down">
		<SvelteMarkdown {source} />
	</div>
</div>

<style>
	h1 {
		color: var(--logo-gold);
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
</style>
