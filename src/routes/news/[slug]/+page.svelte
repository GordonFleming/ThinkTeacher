<script>
	import Icon from "$lib/Icons/icon.svelte";
	import { arrowLeft } from "$lib/Icons/icons";
	import SvelteMarkdown from "svelte-markdown";
	import { onMount } from "svelte";
	import { Jumper } from "svelte-loading-spinners";

	let PdfViewer;

	onMount(async () => {
		const module = await import("svelte-pdf");
		PdfViewer = module.default;
		loading = false;
	});

	export let data;
	let { post } = data;
	let date;
	let publish;
	let source;
	let loading = true;

	date = new Date(post.published_at);
	publish = date.toLocaleString("en-ZA", { month: "long", day: "2-digit", year: "numeric" });
	source = post.content;
</script>

<svelte:window />

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="container">
	<a sveltekit:prefetch href="/news"><Icon data={arrowLeft} scale="3" fill="#4F5D89" /></a>
	<h1 class="text-center mb-4" style="margin-top: 0;">{post.title}</h1>
	<div class="text-center">
		{#if loading}
			<div class="d-flex justify-content-center mt-5">
				<Jumper size="150" color="#5C677D" unit="px" duration="1s" />
			</div>
		{:else}
			<svelte:component
				this={PdfViewer}
				scale="1.4"
				showBorder="false"
				showButtons="false"
				url={post.pdf.url}
			/>
		{/if}
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
