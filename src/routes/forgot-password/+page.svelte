<script>
    import axios from "axios";
    import { API_URL, toastSuc, toastErr } from "$lib/env.js";
    import { object, string } from "yup";
    import { toast } from "@zerodevx/svelte-toast";
    import { Jumper } from "svelte-loading-spinners";

    let loading = false;

    let forgotSchema = object({
        email: string().email().required(),
    });
    let val = {};

    async function forgotPassword() {
        loading = true;
        await axios
            .post(`${API_URL}/auth/forgot-password`, {
                email: val.email,
            })
            .then((response) => {
                console.log("An email has been sent to you.");
                console.log(response);
                loading = false;
                toast.push("Email sent!", toastSuc);
                val = {};
            })
            .catch((error) => {
                console.log("An error occurred:", error.response);
                loading = false;
                toast.push("Something went wrong", toastErr);
            });
    }
</script>

<svelte:head>
    <title>Forgot Password | ThinkTeacher</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5 mb-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1.4s" />
    </div>
{:else}
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

                            <div class="form-outline form-white mb-4">
                                <label class="form-label" for="Email">Email</label>
                                <input
                                    type="email"
                                    id="Email"
                                    class="form-control form-control-lg"
                                    placeholder="Enter email"
                                    bind:value={val.email}
                                    required
                                />
                            </div>

                            <button
                                class="btn btn-outline-light btn-lg px-4"
                                type="submit"
                                disabled={!forgotSchema.isValidSync(val)}
                                on:click|preventDefault={forgotPassword}>Submit</button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
{/if}
