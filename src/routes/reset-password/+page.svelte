<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { API_URL, toastSuc, toastErr } from "$lib/env.js";
    import z from "zxcvbn";
    import Icon from "$lib/Icons/icon.svelte";
    import { eye, eyeSlash } from "$lib/Icons/icons";
    import { toast } from "@zerodevx/svelte-toast";

    let password = "",
        passwordConfirmation;

    let urlParams;
    let myParam;
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
            if (password !== passwordConfirmation) {
                toast.push("Passwords do not match", toastErr);
            } else {
                await axios
                    .post(`${API_URL}/auth/reset-password`, {
                        code: myParam,
                        password: password,
                        passwordConfirmation: passwordConfirmation,
                    })
                    .then((response) => {
                        console.log(response);
                        toast.push("Password reset!", toastSuc);
                        goto("login");
                    })
                    .catch((error) => {
                        console.log("An error occurred:", error.response);
                        toast.push("Something went wrong", toastErr);
                    });
            }
        } else {
            toast.push("Password not strong enough", toastErr);
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
    <title>Reset Password | ThinkTeacher</title>
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-4 p-lg-5 text-center">
                        <h2 class="fw-bold mb-2 text-uppercase">Reset Password</h2>
                        <p class="text-white-50 mb-3">Please enter your new password below.</p>
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
                                    <button
                                        type="button"
                                        class="input-group-text"
                                        on:click={seePassword}
                                        ><Icon data={seePlz ? eye : eyeSlash} scale="1.8" /></button
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
                                    <button class="input-group-text" on:click={seePassword}
                                        ><Icon data={seePlz ? eye : eyeSlash} scale="1.8" /></button
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
