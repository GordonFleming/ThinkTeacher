<script>
	import { goto } from "$app/navigation";
	import { travelType, courseType } from "$lib/stores";

	export let benefitData;

	function redirectPlusDataCompute(type) {
		switch (benefitData[0].partner.company_name.toLowerCase()) {
			case "cirrus travel":
				$travelType = type.toLowerCase().replace(" ", "_");
				goto("/auth/form-travel");
				break;
			case "macmillan":
				$courseType = type;
				goto("/auth/form-courses");
				break;
			case "kim forbes":
				goto("/auth/form-wellbeing");
				break;
			case "sa health brokers (pty) ltd":
				goto("/auth/form-medical-aid");
				break;
			case "alexander forbes":
				goto("/auth/form-finance");
				break;
			case "stephen g. may":
				goto("/auth/form-legal");
				break;
			default:
				goto("/");
		}
	}
</script>

{#if benefitData.length > 0}
	<div class="row mt-2 justify-content-center">
		{#each benefitData as benData}
			<div class="col-sm-12 col-md-10 col-lg-6">
				<div class="card bg-dark m-2 shadow-lg">
					<img
						class="img-fluid rounded cta"
						src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/{benData.banner
							.hash}{benData.banner.ext}"
						alt="cover"
						on:click={() => redirectPlusDataCompute(benData.name)}
					/>
					<div class="card-body">
						<h3 class="card-title text-logo-gold">
							Think <span class="text-lighter-blue">{benData.name}</span>
						</h3>
						<p class="card-text">
							{@html benData.description}
						</p>
						<button
							class="btn bg-gold shadow cta text-black fs-5 p-1"
							on:click={() => redirectPlusDataCompute(benData.name)}>Enquire</button
						>
					</div>
					<div class="card-footer">
						<span class="badge bg-light">{benData.partner.company_name}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<h4>No packages yet.</h4>
{/if}

<style>
	.card {
		height: 92%;
		padding: 3%;
	}
</style>
