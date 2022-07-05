<script context="module">
	import { API_URL } from "$lib/env.js";

	export const load = async ({ fetch }) => {
		const resWebinars = await fetch(`${API_URL}/webinars?_limit=4&_sort=id:DESC`);

		if (resWebinars.ok) {
			const dataWebinar = await resWebinars.json();
			return { props: { webinarData: dataWebinar } };
		}

		return {
			status: resWebinars.status,
			error: new Error(`Could not load`),
		};
	};
</script>

<script>
	import WebinarsBar from "$lib/Components/WebinarsBar.svelte";
	import Carousel from "@beyonk/svelte-carousel";
	import Logo from "$lib/Components/logo.svelte";
	import { goto } from "$app/navigation";
	import { onMount, afterUpdate, onDestroy } from "svelte";
	import viewport from "$lib/useViewportAction.js";
	import { name, travelScroll, firstTime } from "$lib/stores";
	import { fly } from "svelte/transition";

	let intro = null;
	export let webinarData;

	setTimeout(function () {
		intro = false;
	}, 2250);

	onMount(() => {
		// To stop case where user reloads with the counter in view so therefore nothing is triggered...
		// document.body.scrollTop = 0;
		// document.documentElement.scrollTop = 0;
		intro = true;
		document.getElementById("vid").play();
	});

	afterUpdate(() => {
		$name = localStorage.getItem("name");
	});

	onDestroy(() => {
		$firstTime = false;
	});

	let ben1, ben2, ben3, ben4, ben5, ben6, ben7, ben8, ben9, ben10, ben11, ben12;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="banner-all">
	<div class="bg-overlay" />
	<div class="bg-banner text-center">
		{#if $firstTime}
			{#if intro}
				<h1 id="welcome" in:fly={{ x: -200, duration: 2250 }}>Welcome to</h1>
			{:else if intro !== null && !intro}
				<Logo />
			{/if}
		{:else}
			<Logo />
		{/if}
	</div>

	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
		<path
			class=""
			fill="var(--bg-banner)"
			d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
		/>
	</svg>
</div>

<div class="container text-center mt-4">
	<video id="vid" muted autoplay playsinline>
		<source
			src="https://res.cloudinary.com/splyce/video/upload/v1648999283/ThinkTeacher/TT_INTRO_Burder_Blur_rpaqcq.webm#t=1"
			type="video/webm"
		/>
		<source
			src="https://res.cloudinary.com/splyce/video/upload/v1648999288/ThinkTeacher/TT_INTRO_Burder_Blur_yzoqoi.mp4#t=1"
			type="video/mp4"
		/>
	</video>
</div>

<div class="container mt-4 mb-5">
	<div class="row text-center grey-grad rounded justify-content-center big-gap">
		<div class="col-12 p-4">
			<h3 class="read">
				ThinkTeacher is an online portal dedicated to the inspiring teachers of South
				Africa, providing access to benefit options, educational opportunities and nurturing
				networks. Think Teacher's vision is to empower teachers to thrive in their role as
				innovative and sustainable change agents in and for South Africa.
			</h3>
		</div>
	</div>

	{#if !$name}
		<div class="row mt-5">
			<h4 class="text-center fs-1 mb-4">☕ For the price of a coffee a month ☕</h4>
			<div class="col-sm-12 col-lg-4">
				<h4 class="fs-1 mt-2 text-center">
					Actively teaching <strong>R360</strong> pa
				</h4>
			</div>
			<div class="col-sm-12 col-lg-4 mt-sm-4 text-center">
				<button
					class="btn btn-lg bg-gold shadow-lg cta"
					style="width: 300px;"
					on:click={() => goto("/register")}
					><h4 style="color: black;">Become a member!</h4></button
				>
			</div>
			<div class="col-sm-12 col-lg-4">
				<h4 class="fs-1 mt-2 text-center">
					Students and retired teachers <strong>R120</strong> pa
				</h4>
			</div>
		</div>
	{/if}

	<!-- Carousel of Webinars -->

	<WebinarsBar {webinarData} />

	<div class="row grey-grad text-center big-gap">
		<h2>Benefits</h2>
		<h5 class="mb-5">Click on a benefit!</h5>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben1 = true)}>
				<div class="placeholder">
					{#if ben1}
						<img
							transition:fly={{ y: 200, duration: 600 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/well_being_7d5c5b6063.webp"
							alt="well being"
							on:click={() => ($travelScroll = "wellbeing")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Wellbeing</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben2 = true)}>
				<div class="placeholder">
					{#if ben2}
						<img
							transition:fly={{ y: 200, duration: 800 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/travel_65e3eb2228.webp"
							alt="travel"
							on:click={() => ($travelScroll = "travel")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Travel</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben3 = true)}>
				<div class="placeholder">
					{#if ben3}
						<img
							transition:fly={{ y: 200, duration: 1000 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/health_1d4102b3e6.webp"
							alt="medical aid"
							on:click={() => ($travelScroll = "medical_aid")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Medical Aid</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben4 = true)}>
				<div class="placeholder">
					{#if ben4}
						<img
							transition:fly={{ y: 200, duration: 600 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/insurance_f6fd972123.webp"
							alt="invest"
							on:click={() => ($travelScroll = "finance")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Finance</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben5 = true)}>
				<div class="placeholder">
					{#if ben5}
						<img
							transition:fly={{ y: 200, duration: 800 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/legal_ef185539e1.webp"
							alt="legal"
							on:click={() => ($travelScroll = "legal")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Legal</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben6 = true)}>
				<div class="placeholder">
					{#if ben6}
						<img
							transition:fly={{ y: 200, duration: 1000 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/courses_394e2373ce.webp"
							alt="courses"
							on:click={() => ($travelScroll = "courses")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Courses</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben7 = true)}>
				<div class="placeholder">
					{#if ben7}
						<img
							transition:fly={{ y: 200, duration: 600 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/book_store_4ca6894b2a.png"
							alt="books"
							on:click={() => ($travelScroll = "books")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Book Store</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben8 = true)}>
				<div class="placeholder">
					{#if ben8}
						<img
							transition:fly={{ y: 200, duration: 800 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/kia_car_b41351adfc.webp"
							alt="cars"
							on:click={() => ($travelScroll = "cars")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Wheels</h3>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben9 = true)}>
				<div class="placeholder">
					{#if ben9}
						<img
							transition:fly={{ y: 200, duration: 1000 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/photography_68b64fd52e.webp"
							alt="Photography"
							on:click={() => ($travelScroll = "photography")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Photography</h3>
			<h5 class="text-blue">coming soon</h5>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben10 = true)}>
				<div class="placeholder">
					{#if ben10}
						<img
							transition:fly={{ y: 200, duration: 1000 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/connect_79305a0496.webp"
							alt="Connect"
							on:click={() => ($travelScroll = "connect")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Connect</h3>
			<h5 class="text-blue">coming soon</h5>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben11 = true)}>
				<div class="placeholder">
					{#if ben11}
						<img
							transition:fly={{ y: 200, duration: 1000 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/business_coach_0ba79df117.webp"
							alt="Connect"
							on:click={() => ($travelScroll = "business_coach")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Business</h3>
			<h5 class="text-blue">coming soon</h5>
		</div>
		<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<a href="/benefits" use:viewport on:enterViewport={() => (ben12 = true)}>
				<div class="placeholder">
					{#if ben12}
						<img
							transition:fly={{ y: 200, duration: 1000 }}
							class="img-fluid offer offer-img"
							src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/jobs_9c15750f8b.webp"
							alt="Connect"
							on:click={() => ($travelScroll = "jobs")}
						/>
					{/if}
				</div>
			</a>
			<h3 class="mt-3"><span class="text-logo-gold">Think</span> Jobs</h3>
			<h5 class="text-blue">coming soon</h5>
		</div>
	</div>

	<div class="container text-center mb-4 grey-grad big-gap">
		<h2 class="mb-4">
			Why you should become a <span class="text-logo-gold">Think</span>Teacher member
		</h2>

		<!-- svelte-ignore a11y-media-has-caption -->
		<video controls playsinline>
			<source
				src="https://dmtrzpwsgsztkyucmxbx.supabase.in/storage/v1/object/public/temp/THINK TEACHER_ WHO we are and WHAT we do!.mp4#t=3"
				type="video/mp4"
			/>
		</video>
	</div>

	<div class="row grey-grad big-gap">
		<h2>Benefit Details:</h2>
		<div class="col-md-6 col-sm-12 benefit-list">
			<ul>
				<li class=" fw-bold">
					SA Medical Brokers: group medical aid and gap cover rates with Discovery,
					Turnberry and Sirago
				</li>
				<li class=" fw-bold">
					Alexander Forbes Membership Scheme with a range of discounted products, and
					access to dedicated financial advisors
				</li>
				<li class=" fw-bold">
					Nedbank financial assistance, with the Karri School App and a range of financial
					banking products for teachers
				</li>
				<li class=" fw-bold">
					Kia Motors Membership Scheme, offering vehicles at cost plus 2% including a
					five- year unlimited mileage warranty with financing through MFC (Nedbank)
				</li>
				<li class=" fw-bold">
					Legal advice and access to dedicated lawyers with Stephen May Attorney-at-Law
				</li>
			</ul>
		</div>
		<div class="col-md-6 col-sm-12 benefit-list">
			<ul>
				<li class=" fw-bold">
					Macmillan Teacher Campus: discounted courses from Early Learning to FET phase
				</li>
				<li class=" fw-bold">
					Cirrus Travel: specialised and discounted travel packages designed for teachers
					during school holidays
				</li>
				<li class=" fw-bold">Exclusive Books (EB) book club - 10% off at all EB stores</li>
				<li class=" fw-bold">
					Well-being platform for life coaching, nutritional advice, bereavement and
					trauma counselling
				</li>
				<li class=" fw-bold">
					Regular webinars on a range of topics of interest to teachers
				</li>
				<li class=" fw-bold">Monthly newsletters with the latest Think Teacher benefits</li>
				<!-- <li class="list-group-item">
					More partners join us monthly to support the most noble of professions,
					teaching!
				</li> -->
			</ul>
		</div>
	</div>

	<div class="row mt-5 text-center justify-content-center p-3 logo-box">
		<Carousel autoplay={2750} perPage={{ 1300: 4, 1000: 3, 500: 2 }} dots={false}>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_SAHB_LOGO_HIGH_RES_ec14dd3c1d.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid mt-3"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_ROARRR_d380578528.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_Cirrus_Image_2_70004a2daf.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid mt-3"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_alex_forbes_62be1d48f7.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_kim_c21bab4e72.png"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_SGM_Logo_b251d32022.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/small_MTC_New_Logo_large_7ae60c9ecf.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_exclusivebooks_779996b0af.jpeg"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid mt-3"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_kia_logo_16b0a03857.webp"
					alt="partner"
				/>
			</div>
			<div class="slide-content">
				<img
					class="logo img-fluid"
					src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/thumbnail_photography_partner_9ce8b13a83.webp"
					alt="partner"
				/>
			</div>
		</Carousel>
	</div>
</div>

<style>
	h1 {
		margin-top: 5rem;
		font-size: 3em;
		color: var(--logo-grey);
	}
	h2 {
		color: var(--logo-grey);
		font-size: 2.4em;
		text-align: center;
	}
	.read {
		line-height: 2;
	}
	.banner-all {
		position: relative;
	}
	.bg-banner {
		background-color: var(--bg-banner);
		height: 400px;
		padding-top: 5rem;
	}
	.placeholder {
		height: 310px;
	}
	.benefit-list ul li {
		font-size: 1.3em;
		position: relative;
		padding: 1rem 0.3rem;
		color: #212529;
		text-decoration: none;
		background-color: transparent;
		border: 0 solid rgba(255, 255, 255, 0.2);
	}
	.benefit-list ul {
		/* list-style: square outside; */

		list-style-image: url("https://strapi-upload-s3.glass.thinkteacher.co.za/media/m_favicon_08702889be.png");
	}
	@media screen and (min-width: 1000px) {
		.bg-overlay {
			background-image: url("/shape-overly.png");
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
			opacity: 0.15;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
			position: absolute;
		}
		#welcome {
			font-size: 8em;
		}
	}

	@media screen and (max-width: 1000px) {
		.bg-banner {
			height: 200px;
			padding-top: 2rem;
		}
	}

	#welcome {
		margin-top: 0;
	}

	/* TODO */
	/* Make max height smaller for smaller screeens */
	.offer-img {
		max-height: 300px;
	}
	.offer {
		transition: all 0.5s;
	}
	.offer:hover {
		transform: scale(1.05);
		cursor: pointer;
	}
	.btn-lg {
		padding: 2rem 1rem 1rem 1rem;
	}
	.logo {
		max-height: 120px;
		width: auto;
		-webkit-filter: grayscale(100%);
		filter: grayscale(100%);
	}
	.logo-box {
		border: var(--logo-gold) 3px solid;
		border-radius: 2px;
	}
</style>
