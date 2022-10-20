<script>
	import Icon from "$lib/Icons/icon.svelte";
	import { facebook, twitter, instagram, linkedin, youtube } from "$lib/Icons/icons";

	function scrollTop() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
</script>

<footer style="background-color: var(--default-text);" class="text-center text-black mt-5">
	<section class="mb-2 mt-3">
		<!-- Twitter -->
		<a
			class="btn btn-outline-light btn-floating m-1"
			href="https://twitter.com/thinkteacher_sa"
			target="_blank"
			role="button"><Icon data={twitter} scale="2.5" /></a
		>
		<!-- Instagram -->
		<a
			class="btn btn-outline-light btn-floating m-1"
			href="https://www.instagram.com/thinkteacher_rsa"
			target="_blank"
			role="button"><Icon data={instagram} scale="2.5" /></a
		>
		<!-- Facebook -->
		<a
			class="btn btn-outline-light btn-floating m-1"
			href="https://www.facebook.com/thinkteacher"
			target="_blank"
			role="button"><Icon data={facebook} scale="2.5" /></a
		>
		<!-- Linkedin -->
		<a
			class="btn btn-outline-light btn-floating m-1"
			href="https://www.linkedin.com/company/think-teacher"
			target="_blank"
			role="button"><Icon data={linkedin} scale="2.5" /></a
		>
		<!-- Youtube -->
		<a
			class="btn btn-outline-light btn-floating m-1"
			href="https://www.youtube.com/channel/UCN-byMa-sTVbwKWNkbMM9bQ"
			target="_blank"
			role="button"><Icon data={youtube} scale="2.5" /></a
		>
	</section>

	<!-- Section: Text -->
	<section class="mb-4">
		<p>________________</p>
	</section>

	<!--Grid row-->
	<div class="row g-0">
		<!--Grid column-->
		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
			<h5 class="text-uppercase">Socials</h5>

			<ul class="list-unstyled mb-3">
				<li>
					<a
						href="https://www.facebook.com/thinkteacher"
						target="_blank"
						class="text-white">Facebook</a
					>
				</li>
				<li>
					<a href="https://twitter.com/thinkteacher_sa" target="_blank" class="text-white"
						>Twitter</a
					>
				</li>
				<li>
					<a
						href="https://www.instagram.com/thinkteacher_rsa"
						target="_blank"
						class="text-white">Instagram</a
					>
				</li>
				<li>
					<a
						href="https://www.linkedin.com/company/think-teacher"
						target="_blank"
						class="text-white">Linkedin</a
					>
				</li>
				<li>
					<a
						href="https://www.youtube.com/channel/UCN-byMa-sTVbwKWNkbMM9bQ"
						target="_blank"
						class="text-white">YouTube</a
					>
				</li>
			</ul>
		</div>

		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
			<h5 class="text-uppercase">Useful Links</h5>

			<ul class="list-unstyled mb-0">
				<li>
					<a data-sveltekit-prefetch href="/login" class="text-white">Login</a>
				</li>
				<li>
					<a data-sveltekit-prefetch href="/forgot-password" class="text-white"
						>Forgot Password</a
					>
				</li>
				<li>
					<a data-sveltekit-prefetch href="/register" class="text-white">Register</a>
				</li>
				<li>
					<a
						target="_blank"
						href="https://strapi-upload-s3.glass.thinkteacher.co.za/media/Think_Teacher_Member_Terms_and_Conditions_Final_draft_34d3c8193b.pdf"
						class="text-white">Terms & Conditions</a
					>
				</li>
			</ul>
		</div>

		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
			<h5 class="text-uppercase">Contact</h5>

			<ul class="list-unstyled mb-0">
				<li>
					<a href="mailto:zani@thinkteacher.co.za" class="text-white">Zani@ThinkTeacher</a
					>
				</li>
				<li>
					<a data-sveltekit-prefetch href="/contact-us" class="text-white">Contact Us</a>
				</li>
			</ul>
		</div>

		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
			<button class="mt-3 mb-3 btn btn-outline-light px-2" on:click={scrollTop}
				>Scroll to top</button
			>
		</div>
	</div>

	<!-- Copyright -->
	<div class="text-center p-2" style="background-color: var(--logo-gold);">
		© 2022 Copyright: ThinkTeacher
		<!-- <a class="text-white" href="https://splyce.dev">Designed: Splyce</a> -->
	</div>
</footer>

<style>
	footer {
		margin-top: auto !important;
	}
	h5,
	p {
		color: var(--bg-primary);
	}
	li {
		margin-top: 8px;
	}
	li a {
		color: var(--bg-primary) !important;
	}
	/* section > .btn-outline-dark{
        border-color: var(--logo-gold);
    } */
</style>
