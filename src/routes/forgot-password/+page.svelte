<script>
    import axios from "axios";
    import { API_URL } from "$lib/env.js";

    let email;
    let errorMsg;
    let res = false;

    async function forgotPassword() {
        errorMsg = null;
        await axios
            .post(`${API_URL}/auth/forgot-password`, {
                email: email,
            })
            .then((response) => {
                console.log("An email has been sent to you.");
                console.log(response);
                res = true;
                email = "";
            })
            .catch((error) => {
                console.log("An error occurred:", error.response);
                errorMsg = error.response.data.error.message;
            });
    }
</script>

<svelte:head>
    <title>Forgot Password</title>
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-4 p-lg-5 text-center">
                        <h2 class="fw-bold mb-2 text-uppercase">Forgot Password</h2>
                        <p class="text-white-50 mb-3">
                            Please enter your email, where you will receive your reset password
                            link.
                        </p>

                        {#if errorMsg}
                            <h4 class="error-col">{errorMsg}</h4>
                        {/if}

                        {#if res}
                            <h4 class="success-col">Sent!</h4>
                        {/if}

                        <div class="form-outline form-white mb-4">
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

                        <button
                            class="btn btn-outline-light btn-lg px-4"
                            type="submit"
                            on:click|preventDefault={forgotPassword}>Submit</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
