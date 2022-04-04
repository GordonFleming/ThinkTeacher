<script>
	import { onMount, afterUpdate } from "svelte";
	import { name, surname } from "$lib/stores";
	import { goto } from "$app/navigation";

	let avatar = "";
	onMount(() => {
		document.querySelector(".third-button").addEventListener("click", function () {
			document.querySelector(".animated-icon3").classList.toggle("open");
		});
		$name = localStorage.getItem("name");
		$surname = localStorage.getItem("surname");
		avatar = `https://avatars.dicebear.com/api/initials/${
			$name + "-" + $surname
		}.svg?background=%234F5D89&size=40`;
	});

	afterUpdate(() => {
		$name = localStorage.getItem("name");
		$surname = localStorage.getItem("surname");
		avatar = `https://avatars.dicebear.com/api/initials/${
			$name + "-" + $surname
		}.svg?background=%234F5D89&size=40`;
	});

	function logoutUser() {
		localStorage.clear();
		$name = null;
		goto("/");
	}

	function mustClick() {
		if (window.innerWidth <= 992) {
			document.getElementById("burger").click();
		}
	}
</script>

<nav class="navbar navbar-expand-lg navbar-light">
	<div class="container-fluid">
		<button
			id="burger"
			class="navbar-toggler third-button mx-auto"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbar"
			aria-controls="navbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<div class="animated-icon3"><span /><span /><span /></div>
		</button>
		<div class="collapse navbar-collapse justify-content-end" id="navbar">
			<ul class="navbar-nav">
				<div class="nav-img mx-auto">
					<a class="navbar-brand" sveltekit:prefetch href="/" on:click={mustClick}
						><img src="/thinkteacherlogo-final.png" alt="logo" width="200" /></a
					>
				</div>
				<li class="nav-item">
					<a
						class="nav-link fromLeft"
						sveltekit:prefetch
						href="/about"
						on:click={mustClick}>About</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fromLeft"
						sveltekit:prefetch
						href="/benefits"
						on:click={mustClick}>Benefits</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fromLeft"
						sveltekit:prefetch
						href="/partners"
						on:click={mustClick}>Partners</a
					>
				</li>
				<li class="nav-item">
					<a
						class="nav-link fromLeft"
						sveltekit:prefetch
						href="/blog"
						on:click={mustClick}>Blog</a
					>
				</li>
				<li class="nav-item dropdown">
					<a
						class="nav-link from-left dropdown-toggle"
						data-bs-toggle="dropdown"
						href="/"
						role="button"
						aria-expanded="false">Webinars</a
					>
					<ul class="dropdown-menu">
						<li>
							<a
								class="dropdown-item"
								sveltekit:prefetch
								href="/events"
								on:click={mustClick}>Events</a
							>
						</li>
						<li>
							<a
								class="dropdown-item"
								sveltekit:prefetch
								href="/webinars"
								on:click={mustClick}>Webinars</a
							>
						</li>
					</ul>
				</li>
				<!-- <li class="nav-item">
                    <a class="nav-link fromLeft" sveltekit:prefetch href="/our-team" on:click={mustClick}>Our Team</a>
                </li> -->
				<li class="nav-item">
					<a
						class="nav-link fromLeft"
						sveltekit:prefetch
						href="/contact-us"
						on:click={mustClick}>Contact</a
					>
				</li>
			</ul>
		</div>
		<div class="collapse navbar-collapse justify-content-end" id="navbar">
			<!-- Right elements -->
			<div class="d-flex align-items-center align-top">
				{#if $name}
					<a class="mb-2" title="User profile" href="/auth/profile" on:click={mustClick}
						><img class="avatar" src={avatar} alt="avatar" /></a
					>
					<h6>
						&nbsp;&nbsp;Welcome {$name},
						<span id="logout" style="color: var(--logo-gold);" on:click={logoutUser}
							>Logout</span
						>
					</h6>
				{:else}
					<p>
						<a
							href="/login"
							class="nav-link align-top"
							style="color: var(--logo-gold); font-size: 1.16em;"
							on:click={mustClick}>Login</a
						>
					</p>
					<h5>/</h5>
					<p>
						<a
							href="/register"
							class="nav-link"
							style="color: var(--logo-grey); font-size: 1.16em;"
							on:click={mustClick}>Register</a
						>
					</p>
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
	@media screen and (min-width: 1300px) {
		li {
			font-size: 1.16em;
			font-weight: 500;
		}
		a {
			line-height: 2.8rem;
		}
		.nav-img {
			padding-right: 6rem;
		}
		.navbar-nav .nav-link {
			margin-right: 15px;
			margin-left: 15px;
		}
	}

	@media screen and (max-width: 1300px) {
		li {
			font-size: 1em;
			font-weight: 460;
		}
		a {
			line-height: 2.6rem;
		}
	}

	@media screen and (max-width: 992px) {
		img {
			max-width: 80px;
			height: auto;
		}
		a {
			font-size: 1.14em;
			line-height: 3rem;
			text-align: center;
		}
		li {
			text-align: center;
		}
	}
	nav {
		border-bottom: var(--logo-gold) 4px solid;
	}
	/* .navbar-light .navbar-nav .nav-link {
        color: #fff;
    } */
	a {
		display: inline-block;
		width: auto;
	}
	.dropdown-menu {
		background-color: #fefeff;
	}
	.dropdown-item {
		color: black;
	}
	.dropdown-item:active {
		color: #fff;
		text-decoration: none;
		background-color: #fff;
	}
	#logout {
		cursor: pointer;
		font-size: 1.12em;
		transition: 0.3s;
	}
	h6 {
		color: var(--logo-grey);
		margin-right: 1rem;
	}
	#logout:hover {
		font-size: 1.15em;
	}
	a:after {
		display: block;
		content: "";
		border-bottom: solid 3px var(--logo-gold);
		transform: scaleX(0);
		transition: transform 250ms ease-in-out;
	}
	a.fromLeft:after {
		transform-origin: 100% 50%;
	}
	a.fromLeft:hover:after {
		transform: scaleX(1);
		transform-origin: 0% 50%;
	}
	.avatar {
		border-radius: 40%;
		transition: 0.3s;
		border: var(--logo-gold) solid 2px;
	}
	.avatar:hover {
		border-radius: 25%;
	}
</style>
