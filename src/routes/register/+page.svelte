<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import Icon from "$lib/Icons/icon.svelte";
    import { eye, eyeSlash } from "$lib/Icons/icons";
    import { API_URL, toastSuc, toastErr } from "$lib/env.js";
    import z from "zxcvbn";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string, boolean } from "yup";
    import { toast } from "@zerodevx/svelte-toast";

    function success() {
        toast.push("Registered successfully!", toastSuc);
        val = {};
        goto("/auth/profile");
        localStorage.clear();
        sessionStorage.clear();
    }

    let val = {
        email: "",
        s: false,
    };
    let loginSchema = object({
        email: string().email().required(),
        s: boolean().required().isTrue(),
    });

    // Disable button
    let loading = false,
        password = "";

    let errorMsg = null;
    let regError = false;

    // TT Code Gen
    let ttCode = "TT";
    var dateObj = new Date();
    var dateNow = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    ttCode += dateNow.replace(new RegExp("/", "g"), "");
    ttCode += Math.floor(Math.random() * 899 + 100);

    // Password checks
    let barCol = "";
    $: val.s = z(password).score > 2;
    $: progress = (z(password).score / 4) * 100;
    $: val.s ? (barCol = "bg-success") : (barCol = "bg-danger");

    async function registerUser() {
        if (val.s) {
            errorMsg = null;
            await axios
                .post(`${API_URL}/auth/local/register`, {
                    username: val.email,
                    email: val.email,
                    password: password,
                })
                .then((response) => {
                    console.log("User profile", response.data.user);
                    success();
                })
                .catch((error) => {
                    console.log("An error occurred:", error.response);
                    toast.push(error.response.data.error.message, toastErr);
                    regError = true;
                });
        } else if (!val.s) {
            errorMsg = "Password not strong enough";
        }
    }

    let seePlz = true;
    function seePassword() {
        var x = document.getElementById("Password");
        if (x.type === "password") {
            x.type = "text";
            seePlz = false;
        } else {
            seePlz = true;
            x.type = "password";
        }
    }
</script>

<svelte:head>
    <title>Register | ThinkTeacher</title>
    <meta name="description" content="Register for ThinkTeacher!" />
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5 mb-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1.4s" />
    </div>
{:else}
    <section class="vh-50 gradient-custom container mt-4 mb-4">
        <div class="py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-8 col-xl-6">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        <div class="card-body p-md-3 p-lg-4 text-center">
                            <div class="mb-md-3">
                                <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                                <h3>Your digital CV</h3>

                                <form id="register">
                                    <div class="mt-4 google-box">
                                        <button
                                            id="google-sso"
                                            class="Sso__button Sso__googleIdButton"
                                            type="button"
                                            on:click={() =>
                                                goto(
                                                    "https://tt-strapi.glass.thinkteacher.co.za/api/connect/google"
                                                )}
                                        >
                                            Continue with Google
                                        </button>
                                        <div class="Sso__divider">
                                            <span class="Sso__dividerLine" />
                                            <span class="Sso__dividerText">or</span>
                                            <span class="Sso__dividerLine" />
                                        </div>
                                    </div>

                                    <div class="form-outline form-white mb-2">
                                        <label class="form-label" for="Email">Email</label>
                                        <input
                                            type="email"
                                            id="Email"
                                            class="form-control form-control-lg"
                                            placeholder="email"
                                            bind:value={val.email}
                                            required
                                        />
                                    </div>
                                    <div class="form-outline form-white mb-4">
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
                                                ><Icon
                                                    data={seePlz ? eye : eyeSlash}
                                                    scale="1.8"
                                                /></button
                                            >
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
                                                ></div>
                                            </div>
                                            <p style={val.s || "color:red"}>
                                                {val.s
                                                    ? "Strong password"
                                                    : "Password not strong enough. Try using a mix of capital letters, numbers and special characters with a length > 8."}
                                            </p>
                                        {/if}
                                    </div>

                                    <button
                                        class="btn btn-outline-light btn-lg px-4 mt-3"
                                        type="submit"
                                        on:click|preventDefault={registerUser}
                                        disabled={!loginSchema.isValidSync(val)}>Submit</button
                                    >
                                </form>
                            </div>

                            <div>
                                <p class="mb-0 mt-3">
                                    Already have an account? <a
                                        href="/login"
                                        class="text-white-50 fw-bold">Login</a
                                    >
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
</style>
