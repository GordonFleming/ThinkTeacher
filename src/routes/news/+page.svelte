<script>
	import { goto, prefetch } from "$app/navigation";

	export let data;

	let { posts } = data;
</script>

<svelte:head>
	<title>News Flash</title>
	<meta
		name="description"
		content="View all sorts of news flash posts, written by Teachers for teachers!"
	/>
</svelte:head>

<div class="my-4">
	<h1 class="text-center text-3xl font-bold"><span class="think">Think</span>Teacher News</h1>
</div>

<div class="container mx-auto mt-4 mb-5">
	{#if posts.length <= 0}
		<h3 class="text-center">Coming Soon!</h3>
	{:else}
		<div class="row justify-content-center">
			{#each posts as post}
				<div class="col-sm-12 col-md-6 col-lg-4 text-center mt-3">
					<div
						class="news-block bg-dark p-3"
						on:mouseenter={() => prefetch(`/news/${post.slug}`)}
						on:click={() => goto(`/news/${post.slug}`)}
					>
						<h4 class="font-bold">{post.title}</h4>
						<button
							class="btn btn-sm bg-gold  shadow cta text-black"
							on:click={() => goto(`/news/${post.slug}`)}>Read More</button
						>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	h4 {
		color: #fff;
	}
	.news-block {
		border-radius: 20px;
		border: 3px solid var(--logo-gold);
	}
	.news-block:hover {
		cursor: pointer;
		border: 3px solid var(--logo-grey);
	}
</style>
