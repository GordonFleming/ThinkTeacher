<script context="module">
	export const prerender = true;
</script>

<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import axios from "axios";
	import { API_URL } from "$lib/env.js";
	import z from "zxcvbn";
	import Icon from "$lib/Icons/icon.svelte";
	import { eye, eyeSlash } from "$lib/Icons/icons";

	let password = "",
		passwordConfirmation;
	let errorMsg;

	let urlParams;
	let myParam;
	let res = false;
	onMount(() => {
		urlParams = new URLSearchParams(window.location.search);
		myParam = urlParams.get("code");
	});

	let barCol = "";
	$: s = z(password).score > 2;
	$: progress = (z(password).score / 4) * 100;
	$: if (s) {
		barCol = "bg-success";
	} else {
		barCol = "bg-danger";
	}

	async function resetPassword() {
		if (s) {
			errorMsg = null;
			await axios
				.post(`${API_URL}/auth/reset-password`, {
					code: myParam,
					password: password,
					passwordConfirmation: passwordConfirmation,
				})
				.then((response) => {
					console.log("Your password has been reset.");
					res = true;
				})
				.catch((error) => {
					console.log("An error occurred:", error.response);
					errorMsg = error.response.data.message[0].messages[0].message;
				});
		} else {
			errorMsg = "Password not strong enough";
		}
	}

	let seePlz = true;
	function seePassword() {
		var x = document.getElementById("Password");
		var xx = document.getElementById("PasswordConfirm");

		if (x.type === "password") {
			x.type = "text";
			xx.type = "text";
			seePlz = false;
		} else {
			seePlz = true;
			x.type = "password";
			xx.type = "password";
		}
	}
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
	<div class="py-3 h-100">
		<div class="row d-flex justify-content-center align-items-center h-100">
			<div class="col-12 col-md-8 col-lg-6 col-xl-6">
				<div class="card bg-dark text-white" style="border-radius: 1rem;">
					<div class="card-body p-md-4 p-lg-5 text-center">
						<h2 class="fw-bold mb-2 text-uppercase">Forgot Password</h2>
						<p class="text-white-50 mb-3">Please enter your new password below.</p>

						{#if errorMsg}
							<h4 class="error-col">{errorMsg}</h4>
						{/if}

						{#if res}
							<h4 class="success-col">Password Reset</h4>
							<button
								class="btn btn-secondary mx-auto mt-3 mb-3 fw-bold fs-5"
								style="width: 300px;"
								on:click={() => goto("/login")}>Login</button
							>
						{/if}
						<form>
							<div class="form-outline form-white mb-2 text-left">
								<label class="form-label" for="Password">Password</label>
								<div class="input-group mb-3">
									<input
										type="password"
										id="Password"
										class="form-control form-control-lg"
										placeholder="password"
										bind:value={password}
										required
									/>
									<span class="input-group-text" on:click={seePassword}
										><Icon data={seePlz ? eye : eyeSlash} scale="1.5" /></span
									>
								</div>
							</div>
							{#if password.length > 0}
								<div class="progress mt-2">
									<div
										class="progress-bar {barCol}"
										role="progressbar"
										style="width: {progress}%;"
										aria-valuenow="100"
										aria-valuemin="0"
										aria-valuemax="100"
									/>
								</div>
								<p style={s || "color:red"}>
									{s
										? "Strong password"
										: "Password not strong enough. Try using a mix of capital letters, numbers and special characters with a length > 8."}
								</p>
							{/if}
							<div class="form-outline form-white mb-4 mt-3 text-left">
								<label class="form-label" for="PasswordConfirm"
									>Password Confirmation</label
								>
								<div class="input-group mb-3">
									<input
										type="password"
										id="PasswordConfirm"
										class="form-control form-control-lg"
										placeholder="password (again)"
										bind:value={passwordConfirmation}
										required
									/>
									<span class="input-group-text" on:click={seePassword}
										><Icon data={seePlz ? eye : eyeSlash} scale="1.5" /></span
									>
								</div>
							</div>

							<button
								class="btn btn-outline-light btn-lg px-4"
								type="submit"
								on:click|preventDefault={resetPassword}>Submit</button
							>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
