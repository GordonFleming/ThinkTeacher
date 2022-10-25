<script>
    // __layout.reset.svelte ??

    import axios from "axios";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { API_URL } from "$lib/env.js";
    import { errMsg } from "$lib/stores";
    import { compareTime } from "$lib/re_utils";

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

            // const paymentFind = await axios
            // 	.get(`${API_URL}/payments?users_permissions_user.id=${res.data.id}`, {
            // 		headers: {
            // 			Authorization: "Bearer " + localStorage.getItem("jwt"),
            // 		},
            // 	})
            // 	.catch(function (error) {
            // 		console.log(error);
            // 		$errMsg = "No payment found...";
            // 	});

            const created_at = res.data.createdAt;

            let paidMember = res.data.paid;
            // let payment = paymentFind.data;

            // if (payment.length > 0) {
            // 	if (payment[0].paid) {
            // 		paidMember = true;
            // 	}
            // }

            // Check for those users who are valid free members
            if (paidMember) {
                console.log("you are paid up, payment check");
            } else if (compareTime(created_at)) {
                console.log("you are paid up, free member");
            } else {
                goto("/payment");
                console.log("payment needed");
                $errMsg = "Payment is due";
            }

            // Check for if you have paid

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
    <!-- <nav>
		<a href="/auth">Home</a>
		<a href="/auth/selections">Selections</a>
		<a href="/auth/profile">Profile</a>
	</nav> -->
    <slot />
</div>

<!-- <style>
	nav a {
		padding: 1rem;
		font-size: 1.2em;
	}
</style> -->
