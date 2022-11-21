<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { Jumper } from "svelte-loading-spinners";
    import { API_URL } from "$lib/env.js";
    import { benType } from "$lib/stores";

    let loading = true,
        buttonSubmit = true;
    $: if (obj.type_holiday !== "" && obj.reason !== "" && obj.where !== "" && obj.budget !== "") {
        buttonSubmit = false;
    }

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
        __component: "custom-form.travel",
        type_holiday: $benType.toLowerCase().replace(" ", "_"),
        nationality: true,
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
                buttonSubmit = true;
                obj = {};
            })
            .catch((error) => {
                console.log("An error occurred:", error);
                errorMsg = error.response.data.error.message;
            });
    }

    let msg, errorMsg;
</script>

<svelte:head>
    <title>Contact Partner | ThinkTeacher</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5 mb-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1.4s" />
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
                <label for="startDate">Start Date</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    class="form-control form-control-lg"
                    bind:value={obj.start_date}
                />
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label for="endDate">End Date</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    class="form-control form-control-lg"
                    bind:value={obj.end_date}
                />
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label" for="typeHoliday">Type of Holiday</label>
                <select class="form-select" id="typeHoliday" bind:value={obj.type_holiday} required>
                    <option value="" selected>choose</option>
                    <option value="beach">Beach</option>
                    <option value="bush">Bush</option>
                    <option value="ski">Ski</option>
                    <option value="mountains">Mountains</option>
                    <option value="city">City</option>
                    <option value="adventure">Adventure</option>
                    <option value="conference">Conference</option>
                    <option value="sports_tours">Sports Tours</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label" for="reason">Reason for Travel</label>
                <select class="form-select" id="reason" bind:value={obj.reason} required>
                    <option value="" selected>choose</option>
                    <option value="leisure">Leisure</option>
                    <option value="business">Business</option>
                    <option value="sport">Sport</option>
                </select>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label" for="destination">Destination</label>
                <select class="form-select" id="destination" bind:value={obj.where} required>
                    <option value="" selected>choose</option>
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                    <option value="africa">Africa</option>
                </select>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label form-check-label" for="nationality">South African</label>
                <div class="form-switch mt-1 d-flex justify-content-center">
                    <input
                        class="form-check-input form-control"
                        type="checkbox"
                        role="switch"
                        id="nationality"
                        bind:checked={obj.nationality}
                    />
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label" for="numChild">How many under 18</label>
                <input
                    type="number"
                    name="numChild"
                    id="numChild"
                    class="form-control form-control-lg"
                    placeholder="0"
                    bind:value={obj.num_children}
                    min="0"
                    max="100"
                />
            </div>
            <div class="col-sm-12 col-md-6 mt-2">
                <label class="form-label" for="numAdult">How many Adults</label>
                <input
                    type="number"
                    name="numAdult"
                    id="numAdult"
                    class="form-control form-control-lg"
                    placeholder="0"
                    bind:value={obj.num_adults}
                    min="0"
                    max="100"
                />
            </div>
            <div class="col-12 mt-2">
                <label class="form-label" for="budget">Budget</label>
                <select class="form-select" id="budget" bind:value={obj.budget} required>
                    <option value="" selected>choose</option>
                    <option value="budget">Budget</option>
                    <option value="standard">Standard</option>
                    <option value="luxury">Luxury</option>
                </select>
            </div>
        </div>
        <button
            class="btn btn-outline-light btn-lg px-4 mt-4"
            type="submit"
            on:click|preventDefault={submitForm}
            disabled={buttonSubmit}>Submit</button
        >
    </form>
{/if}

<style>
</style>
