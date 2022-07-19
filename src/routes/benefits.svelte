<script context="module">
	import { prod, API_URL } from "$lib/env.js";

	let health_cat = 3,
		travel_cat = 2,
		course_cat = 5,
		wellbeing_cat = 4,
		finance_cat = 1,
		legal_cat = 9,
		books_cat = 6,
		cars_cat = 7,
		glasses_cat = 8;
	if (prod === "true") {
		(health_cat = 2),
			(travel_cat = 1),
			(course_cat = 6),
			(wellbeing_cat = 3),
			(finance_cat = 5),
			(legal_cat = 4),
			(books_cat = 7),
			(cars_cat = 8),
			(glasses_cat = 9);
	}

	export const load = async ({ fetch }) => {
		const endpoint = `${API_URL}/graphql`;
		const headers = {
			"content-type": "application/json",
		};
		const graphqlQuery = {
			operationName: "fetchBenefits",
			query: `query fetchBenefits {     
                packages {
                    name,
                    description,
                    partner {
                        company_name,
                        description,
                        category{
                            id,
                        },
                        logo{
                            url
                        },
                        slug
                    },
                    details,
                    banner{
                        hash,
                        ext
                    }
                } 
            }`,
			variables: {},
		};

		const options = {
			method: "POST",
			headers: headers,
			body: JSON.stringify(graphqlQuery),
		};

		const res = await fetch(endpoint, options);

		let packages = [],
			travel = [],
			health = [],
			wellbeing = [],
			courses = [],
			finance = [],
			legal = [],
			books = [],
			cars = [],
			glasses = [];
		let source;

		if (res.ok) {
			const data = await res.json();
			packages = data.data.packages;

			function seperatePackages(item) {
				switch (parseInt(item.partner.category.id)) {
					case travel_cat:
						travel.push(item);
						break;
					case health_cat:
						health.push(item);
						break;
					case wellbeing_cat:
						wellbeing.push(item);
						source = wellbeing[0].details;
						break;
					case course_cat:
						courses.push(item);
						break;
					case finance_cat:
						finance.push(item);
						break;
					case legal_cat:
						legal.push(item);
						break;
					case books_cat:
						books.push(item);
						break;
					case cars_cat:
						cars.push(item);
						break;
					case glasses_cat:
						glasses.push(item);
						break;
					default:
						console.log("This belongs to nothing...");
				}
			}

			packages.forEach(seperatePackages);

			return {
				props: {
					travel,
					health,
					wellbeing,
					courses,
					finance,
					legal,
					books,
					cars,
					glasses,
					source,
				},
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load page`),
		};
	};
</script>

<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { travelScroll } from "$lib/stores";
	import Benefit from "$lib/Components/Benefit.svelte";
	import PartnerBenefit from "$lib/Components/PartnerBenefit.svelte";
	import SvelteMarkdown from "svelte-markdown";

	let navbar, sticky;
	onMount(() => {
		//document.body.scrollTop = 0;
		function scrollBene() {
			if ($travelScroll) {
				console.log("teydbwfvelw ", $travelScroll);
				document
					.getElementById(`${$travelScroll}`)
					.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
		setTimeout(scrollBene, 150);
		navbar = document.getElementById("nav-benefits");
		sticky = navbar.offsetTop;
	});

	export let travel, wellbeing, health, courses, finance, legal, books, cars;
	//cars, glasses;
</script>

<svelte:head>
	<title>Benefits</title>
	<meta name="description" content="View the many ThinkTeacher's great benefits!" />
</svelte:head>

<svelte:window
	on:scroll={() =>
		window.pageYOffset >= sticky
			? navbar.classList.add("sticky-top")
			: navbar.classList.remove("sticky-top")}
/>

<h1 class="text-center">Exclusive benefits for <span class="think">Think</span>Teacher members</h1>

<div class="text-center" id="nav-benefits">
	<ul class="list-inline">
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("travel")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Travel <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("wellbeing")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Wellbeing <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("medical_aid")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Medical Aid <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("legal")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Legal <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("courses")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Courses <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("finance")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Finance <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<!-- <li class="list-inline-item"><h4 on:click={() => document.getElementById('Books').scrollIntoView({ behavior: 'smooth', block: 'start' })}>Books <span class="text-logo-gold">-</span></h4></li> -->
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("books")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Book Store <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("cars")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Cars <span class="text-logo-gold">-</span>
			</h4>
		</li>
		<li class="list-inline-item">
			<h4
				on:click={() =>
					document
						.getElementById("glasses")
						.scrollIntoView({ behavior: "smooth", block: "start" })}
			>
				Glasses
			</h4>
		</li>
	</ul>
</div>

<div class="container text-center">
	<div class="row mt-4 mb-5 justify-content-center">
		<!-- Travel -->
		<div class="grey-grad row justify-content-center">
			<h2 id="travel" class="display-3">Travel</h2>

			<Benefit benefitData={travel} />

			<PartnerBenefit partnerData={travel} />
		</div>

		<!-- Wellbeing -->
		<div class="grey-grad row justify-content-center" id="wellbeing">
			<h2 class="display-3">Wellbeing</h2>

			<Benefit benefitData={wellbeing} />

			<PartnerBenefit partnerData={wellbeing} />
		</div>

		<!-- MedicalAid -->
		<div class="grey-grad row justify-content-center big-gap" id="medical_aid">
			<h2 class="display-3">Medical Aid</h2>

			<Benefit benefitData={health} />

			<PartnerBenefit partnerData={health} />
		</div>

		<!-- Legal -->
		<div class="grey-grad row justify-content-center big-gap" id="legal">
			<h2 class="display-3">Legal</h2>

			<Benefit benefitData={legal} />

			<PartnerBenefit partnerData={legal} />
		</div>

		<!-- Courses -->
		<div class="grey-grad row justify-content-center big-gap" id="courses">
			<h2 class="display-3">Courses</h2>

			<Benefit benefitData={courses} />

			<PartnerBenefit partnerData={courses} />
		</div>

		<!-- Finance -->
		<div class="grey-grad row justify-content-center big-gap" id="finance">
			<h2 class="display-3">Finance</h2>

			<Benefit benefitData={finance} />

			<PartnerBenefit partnerData={finance} />
			<!-- <iframe src="https://retirements.digital.alexanderforbes.co.za/introduction/2/" title="My Retirement Picture" frameborder="0"></iframe> -->
		</div>

		<!-- Book Store -->
		<div class="grey-grad row justify-content-center big-gap" id="books">
			<h2 class="display-3">Book Store</h2>
			<PartnerBenefit partnerData={books} />
		</div>
		<!-- cars -->
		<div class="grey-grad row justify-content-center big-gap" id="cars">
			<h2 class="display-3">Cars</h2>
			<Benefit benefitData={cars} />

			<PartnerBenefit partnerData={cars} />
		</div>
		<!-- Glasses -->
		<div class="grey-grad row justify-content-center big-gap" id="glasses">
			<h2 class="display-3">Glasses</h2>
			<h4>Coming soon</h4>
		</div>
		<!-- Connect -->
		<div class="grey-grad row justify-content-center big-gap" id="connect">
			<h2 class="display-3">Connect</h2>
			<h4>Coming soon</h4>
		</div>
		<!-- Business -->
		<div class="grey-grad row justify-content-center big-gap" id="business">
			<h2 class="display-3">Business Coach</h2>
			<h4>Coming soon</h4>
		</div>
		<!-- Jobs -->
		<div class="grey-grad row justify-content-center big-gap" id="jobs">
			<h2 class="display-3">Jobs</h2>
			<h4>Coming soon</h4>
		</div>
	</div>
</div>

<style>
	ul li h4 {
		transition: 0.3s;
	}
	ul li h4:hover {
		cursor: pointer;
		font-size: 135%;
	}
	.card {
		height: 92%;
		padding: 3%;
	}
</style>
