<script>
    // __layout.reset.svelte ??

    import axios from "axios";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { toast } from "@zerodevx/svelte-toast";
    import { API_URL, toastErr } from "$lib/env.js";

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
                    if (error.response.data.error.name == "UnauthorizedError") {
                        console.log("JWT token invalid: ", error.response.data.error.message);
                        toast.push("Your session expired, please login again", toastErr);
                    }
                    goto("/login");
                });

            let paidMember = res.data.paid;

            // Check for those users who are valid free members
            if (paidMember) {
                console.log("you are paid up, payment check");
            } else {
                goto("/payment");
                console.log("payment needed");
                toast.push("Payment is required.", toastErr);
            }
        } else {
            const currentUrl = new URL(window.location.href);
            const currentPath = currentUrl.pathname;
            const loginUrl = `/login?r=${encodeURIComponent(currentPath)}`;
            goto(loginUrl);
            toast.push("Login required.", toastErr);
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
