<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Icon from "$lib/Icons/icon.svelte";
    import { facebook, instagram, eye, eyeSlash } from "$lib/Icons/icons";
    import { API_URL, toastErr } from "$lib/env.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { logoutUser } from "$lib/utils";

    let redirectUrl = null;
    let email, password;

    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        redirectUrl = urlParams.get("r");

        // Check if user is already logged in via JWT cookie
        const cookies = document.cookie.split(";");
        const jwtCookie = cookies.find((cookie) => cookie.trim().startsWith("jwt="));

        if (jwtCookie) {
            logoutUser();
        }
    });

    async function loginUser() {
        try {
            const response = await fetch(`${API_URL}/auth/local`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log("An error occurred:", data);
                toast.push(data.error.message, toastErr);
                return;
            }

            // Store the JWT token in cookies
            const jwt = data.jwt;
            document.cookie = `jwt=${jwt}; path=/;`;

            let paidMember = data.user.paid;

            if (redirectUrl) {
                goto(redirectUrl);
            } else {
                goto("/benefits");
            }
            // } else {
            //     goto("/payment");
            //     toast.push("Payment required.", toastErr);
            // }
        } catch (error) {
            console.log("An error occurred:", error);
            toast.push("An unexpected error occurred. Please try again.", toastErr);
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
    <title>Login | ThinkTeacher</title>
    <meta name="description" content="ThinkTeacher Login" />
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-4 p-lg-4 text-center">
                        <div class="mb-md-3">
                            <h2 class="fw-bold mb-2 text-uppercase">Login</h2>

                            <div class="mt-4 google-box">
                                <a
                                    href="https://tt-strapi.glass.thinkteacher.co.za/api/connect/google"
                                >
                                    <div id="google-sso" class="Sso__button Sso__googleIdButton">
                                        Continue with Google
                                    </div>
                                </a>
                                <div class="Sso__divider">
                                    <span class="Sso__dividerLine" />
                                    <span class="Sso__dividerText">or</span>
                                    <span class="Sso__dividerLine" />
                                </div>
                            </div>
                            <p class="text-white-50 mb-3">Please enter your email and password</p>
                            <form name="login">
                                <div class="form-outline form-white mb-2 mt-3">
                                    <label class="form-label" for="Email">Email</label>
                                    <input
                                        type="email"
                                        id="Email"
                                        class="form-control form-control-lg"
                                        placeholder="Enter email"
                                        bind:value={email}
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
                                </div>

                                <p class="small mb-3 pb-lg-2">
                                    <a class="text-white-50" href="/forgot-password"
                                        >Forgot password?</a
                                    >
                                </p>

                                <button
                                    class="btn btn-outline-light btn-lg px-4"
                                    type="submit"
                                    on:click|preventDefault={loginUser}>Login</button
                                >
                            </form>

                            <div class="mt-2 pt-1">
                                <a
                                    href="https://www.facebook.com/thinkteacher"
                                    class="text-white px-2"><Icon data={facebook} scale="2.2" /></a
                                >
                                <a
                                    href="https://www.instagram.com/thinkteacher_rsa"
                                    class="text-white px-2"><Icon data={instagram} scale="2.2" /></a
                                >
                            </div>
                        </div>

                        <div>
                            <p class="mb-0">
                                Don't have an account? <a
                                    href="/register"
                                    class="text-white-50 fw-bold">Register</a
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    /* input {
        max-width: 400px;
        margin: 0 auto;
    } */
</style>
