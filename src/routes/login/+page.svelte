<script>
    import { onMount } from "svelte";
    import axios from "axios";
    import { goto } from "$app/navigation";
    import Icon from "$lib/Icons/icon.svelte";
    import { name, surname, id, ttNum } from "$lib/stores";
    import { facebook, twitter, instagram, eye, eyeSlash } from "$lib/Icons/icons";
    import { browserSet, compareTime } from "$lib/re_utils";
    import { API_URL, toastErr } from "$lib/env.js";
    import { toast } from "@zerodevx/svelte-toast";

    let usernameEmail, password;

    function logoutUser() {
        localStorage.clear();
        $name = null;
    }

    onMount(() => {
        logoutUser();
    });

    async function loginUser() {
        await axios
            .post(`${API_URL}/auth/local`, {
                identifier: usernameEmail,
                password: password,
            })
            .then((response) => {
                browserSet("jwt", response.data.jwt);
                browserSet("name", response.data.user.firstName);
                $name = response.data.firstName;
                browserSet("surname", response.data.user.lastName);
                $surname = response.data.lastName;
                browserSet("id", response.data.user.id);
                $id = response.data.id;
                browserSet("ttNum", response.data.user.ttCode);
                $ttNum = response.data.user.ttCode;
                let created_at = response.data.user.createdAt;
                let paidMember = response.data.user.paid;

                if (paidMember) {
                    console.log("you are paid up, payment check");
                    goto("/benefits");
                } else if (compareTime(created_at)) {
                    console.log("you are paid up, free member");
                    goto("/benefits");
                } else {
                    console.log("you are not paid up");
                    goto("/payment");
                }
            })
            .catch((error) => {
                console.log("An error occurred:", error);
                toast.push(error.response.data.error.message, toastErr);
            });
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
                            <h2 class="fw-bold mb-2">LOGIN</h2>

                            <div class="mt-4 google-box">
                                <a
                                    href="https://tt-strapi.glass.thinkteacher.co.za/api/connect/google"
                                >
                                    <div id="google-sso" class="Sso__button Sso__googleIdButton">
                                        Continue with Google
                                    </div>
                                </a>
                                <div class="Sso__divider ">
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
                                        placeholder="Enter email or username"
                                        bind:value={usernameEmail}
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
                                    href="https://twitter.com/thinkteacher_sa"
                                    class="text-white px-2"><Icon data={twitter} scale="2.2" /></a
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
