<script>
	import { onMount } from "svelte";
	import { id } from "$lib/stores";

	if ($id === undefined) {
		$id = localStorage.getItem("id");
	}

	// Replace the supplied `publicKey` with your own.
	// Ensure that in production you use a production public_key.
	let sdk,
		inline,
		form,
		submitButton = true,
		amountInCents = 36000,
		tokenCreated = false,
		amountInRands = amountInCents / 100;
	onMount(async () => {
		sdk = new window.YocoSDK({
			publicKey: "pk_test_7322f2efgOezbbk123c4",
		});

		// Create a new dropin form instance
		inline = sdk.inline({
			layout: "basic",
			amountInCents: amountInCents,
			currency: "ZAR",
		});

		// this ID matches the id of the element we created earlier.
		inline.mount("#card-frame");
		// Run our code when your form is submitted
		form = document.getElementById("payment-form");
	});

	let token;
	async function submit() {
		// Disable the button to prevent multiple clicks while processing
		submitButton = false;
		// This is the inline object we created earlier with the sdk
		inline
			.createToken()
			.then(function (result) {
				// Re-enable button now that request is complete
				// (i.e. on success, on error and when auth is cancelled)
				submitButton = true;
				if (result.error) {
					const errorMessage = result.error.message;
					errorMessage && alert("error occured: " + errorMessage);
				} else {
					token = result;
					alert("card successfully tokenised: " + token.id);
					tokenCreated = true;
				}
			})
			.catch(function (error) {
				// Re-enable button now that request is complete
				submitButton = true;
				alert("error occured: " + error);
			});

		if (tokenCreated) {
			await axios
				.post(`${API_URL}/payments`, {
					amount_in_cents: amountInCents,
					token: token,
					users_permissions_user: {
						id: $id,
					},
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log("An error occurred:", error.response.data);
				});
		}
	}
	// Any additional form data you want to submit to your backend should be done here, or in another event listener
</script>

<svelte:head>
	<title>Payment</title>
	<script src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js"></script>
</svelte:head>

<div class="container mt-5">
	<div class="row">
		<div class="col d-flex justify-content-center">
			<form id="payment-form">
				<div class="one-liner">
					<div id="card-frame">
						<!-- Yoco Inline form will be added here -->
					</div>
					<button
						id="pay-button"
						class:bg-gold={submitButton}
						class:cta={submitButton}
						class="btn btn-sm shadow mt-3"
						on:click|preventDefault={submit}
						disabled={!submitButton}
					>
						PAY - R {amountInRands}
					</button>
				</div>
				<p class="success-payment-message" />
			</form>
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
</style>
