<script>
	import { goto, prefetch } from "$app/navigation";
	import { travelScroll } from "$lib/stores";

	export let data;
	let { partners } = data;
</script>

<svelte:head>
	<title>Partners</title>
	<meta name="description" content="View ThinkTeacher's great partners!" />
</svelte:head>

<div class="container mb-5">
	<h1 class="text-center mb-4"><span class="think">Think</span>Teacher Partners</h1>

	<div class="row justify-content-center">
		{#each partners as partner}
			<div class="col-sm-12 col-md-6 col-lg-4">
				<div class="card bg-dark m-2 shadow-lg">
					<img
						class="img-fluid rounded cta"
						src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/{partner.logo
							.hash}{partner.logo.ext}"
						alt="cover"
						on:mouseenter={() => prefetch(`/partners/${partner.slug}`)}
						on:click={() => goto(`/partners/${partner.slug}`)}
					/>

					<div class="card-body">
						<h5 class="card-title">{partner.company_name}</h5>
						<p class="card-text">
							{partner.description}
						</p>
						<button
							class="btn-sm btn bg-gold mx-auto shadow cta"
							on:mouseenter={() => prefetch(`/partners/${partner.slug}`)}
							on:click={() => goto(`/partners/${partner.slug}`)}>Read More</button
						>
					</div>
					<div class="card-footer">
						<a data-sveltekit-prefetch href="/benefits"
							><span
								class="badge bg-light"
								on:click={() =>
									($travelScroll = partner.category.name.toLowerCase())}
								>{partner.category.name.replace("_", " ")}</span
							></a
						>
					</div>
				</div>
			</div>
		{/each}

		<div class="mt-4 text-center">
			<button
				class="btn btn-lg bg-gold mx-auto shadow-lg cta"
				style="width: 300px;"
				on:click={() => goto("/benefits")}
				><h4 class="text-black mt-2">Check their benefits</h4></button
			>
			<p class="mt-3">
				Interested in being a ThinkTeacher partner? Contact <a
					href="mailto:bridget@thinkteacher.co.za">bridget@thinkteacher.co.za</a
				>.
			</p>
		</div>
	</div>
</div>

<style>
</style>
