<script>
	import { onMount } from "svelte";
	import { id, errMsg } from "$lib/stores";
	import axios from "axios";
	import { API_URL } from "$lib/env.js";
	import { Jumper } from "svelte-loading-spinners";
	import Icon from "svelte-awesome";
	import { checkCircleO } from "svelte-awesome/icons";

	// TODO : show any errors to user... add user name, surname and any others along with the meta you want like ttcode...

	let sdk,
		inline,
		form,
		loading = true,
		paying = false,
		submitButton = true,
		amountInCents = 36000,
		amountInRands = amountInCents / 100,
		successMsg;

	onMount(async () => {
		if ($id === undefined) {
			$id = localStorage.getItem("id");
		}

		sdk = new window.YocoSDK({
			publicKey: "pk_test_7322f2efgOezbbk123c4",
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
		inline
			.createToken()
			.then(function (result) {
				submitButton = true;
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
					payed: true,
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
	<script src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js"></script>
</svelte:head>

<div class="container mt-5">
	<div class="row">
		<div class="text-center">
			<h2 class="mb-4">Membership <span class="text-blue">Payment</span></h2>
			{#if successMsg !== undefined}
				<h4 class="success-col">{successMsg}</h4>
				<Icon class="success-col" data={checkCircleO} scale="2.4" />
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
</style>
