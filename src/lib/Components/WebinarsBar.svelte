<script>
	import Carousel from "@beyonk/svelte-carousel";

	export let webinarData;
</script>

<div class="container">
	<div class="row grey-grad big-gap">
		<h2 class="text-center text-blue">Webinars</h2>

		<Carousel autoplay={2600} perPage={{ 1000: 3, 500: 1 }} dots={false}>
			{#each webinarData as webinar}
				<div class="p-2">
					<div class="frame-wrapper">
						<a href={webinar.link}
							><img
								class="img-fluid p-1"
								src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_434b7329f8.webp"
								alt="webinar Thumbnail"
							/></a
						>
						<p class="text-white p-1">
							{webinar.description.substr(0, 84)}...
						</p>
					</div>
				</div>
			{/each}
		</Carousel>
	</div>
</div>

<style>
	.frame-wrapper {
		background-color: var(--logo-grey);
		width: 100%;
		height: 100%;
		border-radius: 5px;
		border: 3px solid var(--logo-gold);
	}
</style>
