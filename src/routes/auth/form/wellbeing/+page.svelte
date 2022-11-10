<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { Jumper } from "svelte-loading-spinners";
    import { API_URL } from "$lib/env.js";

    let loading = true,
        buttonSubmit = false;

    let fullname, email, ttNum, user;

    onMount(async () => {
        const res = await axios
            .get(`${API_URL}/users/me`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .catch(function (error) {
                console.log("Error", error.message);
                goto("/login");
            });
        user = res.data;

        loading = false;
        fullname = user.firstName + " " + user.lastName;
        email = user.email;
        ttNum = user.ttCode;
    });

    let obj = {
        __component: "custom-form.wellbeing",
        life_coaching: false,
        bereavement: false,
        nutrition: false,
        wellbeing: false,
        other: "",
    };

    async function submitForm() {
        loading = true;
        await axios
            .post(`${API_URL}/partner-forms`, {
                data: {
                    custom: [obj],
                    users_permissions_user: user.id,
                },
            })
            .then((response) => {
                msg =
                    fullname +
                    ", you have successfully made contact with ThinkTeacher's partner. The partner will be in touch with you soon.";
                console.log(response);
                loading = false;
                obj = {};
            })
            .catch((error) => {
                console.log("An error occurred:", error.response.data);
                errorMsg = error.response.data.error.message;
            });
    }

    let msg, errorMsg;
</script>

<svelte:head>
    <title>Contact Partner</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s" />
    </div>
{:else}
    <h2 class="fw-bold mb-2 text-uppercase">Contact Partner</h2>
    {#if errorMsg}
        <h4 class="error-col">{errorMsg}</h4>
    {:else if msg}
        <h4 class="success-col">{msg}</h4>
    {/if}

    <form id="contactPartner">
        <div class="row">
            <div class="col-md-12">
                <label class="form-label" for="name">Name</label>
                <input
                    type="text"
                    name="fullname"
                    id="name"
                    class="form-control form-control-lg"
                    bind:value={fullname}
                    readonly
                    required
                />
            </div>
            <div class="col-md-12 mt-2">
                <label class="form-label" for="surname">Email</label>
                <input
                    type="text"
                    name="surname"
                    id="surname"
                    class="form-control form-control-lg"
                    bind:value={email}
                    readonly
                    required
                />
            </div>
            <div class="col-12 mt-2">
                <label class="form-label" for="idNum">ThinkTeacher Number</label>
                <input
                    type="text"
                    name="idNumber"
                    id="idNum"
                    class="form-control form-control-lg"
                    bind:value={ttNum}
                    readonly
                    required
                />
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label form-check-label" for="lifeCoaching">Life Coaching</label>
                <div class="form-switch mt-1">
                    <input
                        class="form-check-input form-control"
                        type="checkbox"
                        role="switch"
                        id="lifeCoaching"
                        bind:checked={obj.life_coaching}
                    />
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label form-check-label" for="bereavement">Bereavement</label>
                <div class="form-switch mt-1">
                    <input
                        class="form-check-input form-control"
                        type="checkbox"
                        role="switch"
                        id="bereavement"
                        bind:checked={obj.bereavement}
                    />
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label form-check-label" for="nutrition">Nutrition</label>
                <div class="form-switch mt-1">
                    <input
                        class="form-check-input form-control"
                        type="checkbox"
                        role="switch"
                        id="nutrition"
                        bind:checked={obj.nutrition}
                    />
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label form-check-label" for="wellbeing">Wellbeing</label>
                <div class="form-switch mt-1">
                    <input
                        class="form-check-input form-control"
                        type="checkbox"
                        role="switch"
                        id="wellbeing"
                        bind:checked={obj.wellbeing}
                    />
                </div>
            </div>
            <div class="col-12 mt-2">
                <label class="form-label" for="other">Other</label>
                <input
                    type="text"
                    name="other"
                    id="other"
                    class="form-control form-control-lg"
                    bind:value={obj.other}
                />
            </div>
        </div>
        <button
            class="btn btn-outline-light btn-lg px-4 mt-4"
            type="submit"
            on:click|preventDefault={submitForm}>Submit</button
        >
    </form>
{/if}

<style>
    .form-check-input {
        margin: 0 auto !important;
    }
    .form-check-input:checked {
        background-color: var(--logo-gold);
        border-color: var(--logo-gold);
    }
    .form-check-input:focus {
        border-color: rgba(255, 255, 255, 0.4);
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(217, 183, 61, 0.055);
    }
</style>
