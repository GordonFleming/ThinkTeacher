<script>
	import { onMount } from "svelte";
	import { id, errMsg } from "$lib/stores";
	import axios from "axios";
	import { API_URL, yocoPubKey } from "$lib/env.js";
	import { Jumper } from "svelte-loading-spinners";
	import Icon from "$lib/Icons/icon.svelte";
	import { checkCircleO } from "$lib/Icons/icons";

	let sdk,
		inline,
		form,
		loading = true,
		paying = false,
		submitButton = true,
		amountInCents = 36000,
		successMsg,
		retireStu = false;

	$: amountInRands = amountInCents / 100;
	$: retireStu ? (amountInCents = 12000) : (amountInCents = 36000);

	let mem_disc = "ThinkTeacher Annual Membership";
	let refNum = Math.floor(Math.random() * 90000) + 10000;

	onMount(async () => {
		if ($id === undefined) {
			$id = localStorage.getItem("id");
		}

		sdk = new window.YocoSDK({
			publicKey: yocoPubKey,
		});

		inline = sdk.inline({
			layout: "basic",
			amountInCents: amountInCents,
			currency: "ZAR",
			showErrors: true,
		});

		inline.mount("#card-frame");
		form = document.getElementById("payment-form");
		loading = false;
	});

	let token;
	async function makePayment() {
		submitButton = false;
		loading = true;
		inline
			.createToken()
			.then(function (result) {
				submitButton = true;
				loading = false;
				if (result.error) {
					const errorMessage = result.error.message;
					console.log(errorMessage);
				} else {
					token = result;
					paying = true;
					console.log("card successfully tokenised: " + token.id);
				}
			})
			.catch(function (error) {
				submitButton = true;
				alert("error occured: " + error);
			});

		inline.on("card_tokenized", function (token) {
			console.log("restsdfgsdgs", token);
			$errMsg = "";
			successMsg = undefined;
			axios
				.post(`${API_URL}/payments`, {
					amount_in_cents: amountInCents,
					token: token.id,
					paid: true,
					description: mem_disc,
					reference_number: refNum,
					users_permissions_user: {
						id: $id,
					},
				})
				.then((response) => {
					successMsg = "Success, payment has been made!";
					console.log(response);
					paying = false;
				})
				.catch((error) => {
					$errMsg = error.response.data.message.error.displayMessage;
					console.log("An error occurred:", error.response.data);
					paying = false;
				});
			form.reset();
		});
	}
</script>

<svelte:head>
	<title>Payment</title>
</svelte:head>

<div class="container mt-5">
	<div class="row">
		<div class="text-center">
			<h2 class="mb-4">Membership <span class="text-blue">Payment</span></h2>
			<h6>Pay via EFT or by card payment</h6>
			{#if successMsg !== undefined}
				<h4 class="success-col">{successMsg}</h4>
				<Icon data={checkCircleO} scale="8" fill="green" />
			{/if}
			{#if $errMsg !== ""}
				<h4 class="error-col">{$errMsg}</h4>
			{/if}

			{#if loading || paying}
				<div class="d-flex justify-content-center mt-5">
					<Jumper size="150" color="#5C677D" unit="px" duration="1s" />
				</div>

				{#if paying}
					<h3 class="text-center">We are busy processing your payment...</h3>
				{/if}
			{/if}
		</div>

		<div class="col d-flex justify-content-center">
			<form id="payment-form">
				<div class="one-liner">
					<div id="card-frame">
						<!-- Yoco Inline form will be added here -->
					</div>

					<!-- <div class="form-switch mt-3 text-center">
						<label for="retireStu">Are you a student or a retired teacher?</label>
						<input
							class="form-check-input form-control mx-auto"
							type="checkbox"
							role="switch"
							id="retireStu"
							bind:checked={retireStu}
						/>
					</div> -->

					<div class="text-center mt-4 mb-4">
						<button
							id="pay-button"
							class:bg-gold={submitButton}
							class:cta={submitButton}
							class="btn btn-lg shadow"
							on:click|preventDefault={makePayment}
							disabled={!submitButton}
						>
							PAY - R {amountInRands}
						</button>
					</div>
				</div>
				<p class="success-payment-message" />
			</form>
		</div>
	</div>
	<hr class="rounded" />
	<div class="text-center mt-4 mb-3">
		<img
			class="img-fluid mb-3"
			id="yoco"
			src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/yoco_colour_d4694a7164.svg"
			alt="yoco"
		/><br />
		<img
			class="img-fluid payment-logo"
			src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/visa_colour_0104f4de82.svg"
			alt="visa"
		/>
		<img
			class="img-fluid payment-logo"
			src="https://strapi-upload-s3.glass.thinkteacher.co.za/media/mastercard_colour_446709c296.svg"
			alt="mastercard"
		/>
	</div>
	<hr class="rounded" />
	<div class="row">
		<div class="col text-center mt-4 mb-4">
			<h5>EFT details:</h5>
			<p>ThinkTeacher (Pty) LTD</p>
			<p>Nedbank</p>
			<p>Business account: 1217188746</p>
		</div>
		<div class="mb-4 text-center">
			Contact <strong><a href="mailto:zani@thinkteacher.co.za">Zani</a></strong> if you are having
			issues with payment.
		</div>
	</div>
</div>

<style>
	#card-frame {
		max-width: 550px;
	}
	button {
		background-color: grey;
	}
	.bg-gold {
		background-color: var(--logo-gold);
	}
	.payment-logo {
		max-width: 55px;
		margin-right: 20px;
		margin-left: 20px;
	}
	#yoco {
		max-width: 120px;
	}
	hr.rounded {
		border-top: 4px solid #bbb;
		border-radius: 3px;
		max-width: 20vw;
		margin: 0 auto;
	}
	.form-switch {
		padding-left: 0;
	}
	.form-check-input {
		/* margin: 0 auto !important; */
		background-color: var(--logo-grey);
	}
	.form-check-input:checked {
		background-color: var(--logo-gold);
		border-color: var(--logo-gold);
	}
	.form-check-input:focus {
		border-color: rgba(255, 255, 255, 0.4);
		outline: 0;
		box-shadow: 0 0 0 0.25rem rgba(217, 183, 61, 0.055);
	}
</style>
