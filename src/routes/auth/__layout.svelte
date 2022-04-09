<script>
	// __layout.reset.svelte ??

	import axios from "axios";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { API_URL } from "$lib/env.js";
	import { errMsg } from "$lib/stores";

	let paid = false;

	function compareTime(time1, time2) {
		return new Date(time1) < new Date(time2); // true if time1 is earlier
	}

	onMount(async () => {
		if (localStorage.getItem("jwt") && localStorage.getItem("ttNum")) {
			const res = await axios
				.get(`${API_URL}/users/me`, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("jwt"),
					},
				})
				.catch(function (error) {
					console.log(error.response.data);
					if (error.response.data.error == "Unauthorized") {
						goto("/login");
						console.log("JWT token invalid: ", error.response.data.message);
						$errMsg = "Your session expired, please login again.";
					}
				});

			const year = 3.16 * Math.pow(10, 10);
			const created_at = res.data.created_at;
			const cut_off_date = "2022-04-12";
			// Check for those users who are valid free members
			if (compareTime(new Date(created_at), new Date(cut_off_date))) {
				paid = true;
				console.log("you are paid up");
			} else {
				goto("/payment");
				console.log("payment needed");
				$errMsg = "Your account's payment is not up to date...";
			}

			// Check for if you have payed

			// TODO: use this below to check if it has been a year since a user paid and needs to renew their membership

			// const time_difference = new Date(Date.now()) - new Date(created_at);
			// const time_difference_days = Math.floor(time_difference / (1000 * 60) / 60 / 24);
			// if (time_difference > year) {
			// 	goto("/login");
			// 	console.log(
			// 		`Free member! With their time in days since registration currently at: ${time_difference_days}`
			// 	);
			// }
		} else {
			goto("/login");
		}
	});
</script>

<div class="container text-center mt-4">
	<nav>
		<a href="/auth">Home</a>
		<a href="/auth/selections">Selections</a>
		<a href="/auth/profile">Profile</a>
	</nav>
	<slot />
</div>

<style>
	nav a {
		padding: 1rem;
		font-size: 1.2em;
	}
</style>
