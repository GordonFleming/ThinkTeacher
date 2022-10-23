<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { API_URL } from "$lib/env.js";
    import { name, surname, id, ttNum, cut_off_date } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { Jumper } from "svelte-loading-spinners";
    import { browserSet, browserSessionSet, compareTime } from "$lib/re_utils";

    let loading = true,
        errMsg;
    let urlParams;
    let myParam, userData;
    onMount(async () => {
        urlParams = new URLSearchParams(window.location.search);
        myParam = urlParams.get("access_token");

        const res = await axios.get(`${API_URL}/auth/google/callback?access_token=${myParam}`);

        userData = res.data;
        browserSessionSet("provider", userData.user.provider);
        browserSet("jwt", userData.jwt);
        browserSet("id", userData.user.id);
        $id = userData.user.id;

        let created_at = userData.user.created_at;
        let paidMember = userData.user.paid;

        if (!userData.user.idNum || !userData.user.firstName) {
            goto("/register");
        } else if (userData.user.idNum) {
            browserSet("name", userData.user.firstName);
            $name = userData.user.firstName;
            browserSet("surname", userData.user.lastName);
            $surname = userData.user.lastName;
            browserSet("ttNum", userData.user.ttCode);
            $ttNum = userData.user.ttCode;

            if (paidMember) {
                console.log("you are paid up, payment check");
                goto("/benefits");
            } else if (compareTime(new Date(created_at), new Date($cut_off_date))) {
                console.log("you are paid up, free member");
                goto("/benefits");
            } else {
                console.log("you are not paid up");
                goto("/payment");
            }
        } else {
            errMsg = "Something went wrong...";
        }
        loading = false;
    });
</script>

<div class="container mt-5 mb-5">
    <div class="row text-center justify-content-center">
        {#if loading}
            <div class="d-flex justify-content-center mt-5">
                <Jumper size="150" color="#5C677D" unit="px" duration="1s" />
            </div>
            <p>Redirecting you...</p>
        {/if}

        {#if errMsg}
            <h2>{errMsg}</h2>
        {/if}
    </div>
</div>
