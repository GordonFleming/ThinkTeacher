<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import Icon from "$lib/Icons/icon.svelte";
    import { arrowLeft, eye, eyeSlash } from "$lib/Icons/icons";
    import { sgKey, sendgridList, API_URL } from "$lib/env.js";
    import z from "zxcvbn";
    import saIdParser from "south-african-id-parser";
    import { onMount } from "svelte";
    import { id, name } from "$lib/stores";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string, number, boolean } from "yup";

    onMount(() => {
        $name = null;

        if (sessionStorage.getItem("provider") == "google") {
            registerNext = true;
            provider = true;
        }
    });

    // $: userSchema
    //     .validate(val, { abortEarly: false })
    //     .then(function () {
    //         // Success
    //     })
    //     .catch(function (err) {
    //         console.log(err.inner);
    //         err.inner.forEach((e) => {
    //             console.log(e.message);
    //         });
    //     });

    let loginSchema = object({
        username: string().required(),
        email: string().email().required(),
        s: boolean().required().isTrue(),
    });
    let userSchema = object({
        firstName: string().required(),
        lastName: string().required(),
        isValidID: boolean().required().isTrue(),
        altMail: string().email().nullable(),
        cell: number().required(),
        eduPhase: string().required(),
        qualification: string().nullable(),
        sace: string().nullable(),
        workplace: string().nullable(),
        province: string().nullable(),
        terms: boolean().required().isTrue(),
    });

    let val = {};

    // Disable button
    let loading = false,
        idNum,
        password = "";

    let msg,
        errorMsg = null;
    let registerNext = false,
        registered = false,
        provider = false,
        nationality = true;

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
    // ID check & To account for non SA
    $: val.isValidID = nationality ? saIdParser.validate(idNum) : true;

    async function registerUser() {
        if (provider) {
            await axios
                .put(
                    `${API_URL}/users/${$id}`,
                    {
                        firstName: val.firstName,
                        lastName: val.lastName,
                        idNum: idNum,
                        altMail: val.altMail,
                        cell: val.cell,
                        eduPhase: val.eduPhase,
                        qualification: val.qualification,
                        sace: val.sace,
                        workplace: val.workplace,
                        province: val.province,
                        ttCode: ttCode,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt"),
                        },
                    }
                )
                .then((response) => {
                    console.log("User profile", response.data.user);
                    msg =
                        response.data.firstName +
                        ", you have been successfully registered with ThinkTeacher!";
                    email = response.data.email;
                    registerNext = false;
                    registered = true;
                })
                .catch((error) => {
                    console.log("An error occurred:", error.response);
                    errorMsg = error.response.data.error.message;
                });
        }
        if (val.s && !provider) {
            errorMsg = null;
            await axios
                .post(`${API_URL}/auth/local/register`, {
                    username: val.username,
                    email: val.email,
                    password: password,
                    firstName: val.firstName,
                    lastName: val.lastName,
                    idNum: idNum,
                    altMail: val.altMail,
                    cell: val.cell,
                    eduPhase: val.eduPhase,
                    qualification: val.qualification,
                    sace: val.sace,
                    workplace: val.workplace,
                    province: val.province,
                    ttCode: ttCode,
                })
                .then((response) => {
                    console.log("User profile", response.data.user);
                    msg =
                        response.data.user.firstName +
                        ", you have been successfully registered with ThinkTeacher!";
                    registerNext = false;
                    registered = true;
                })
                .catch((error) => {
                    console.log("An error occurred:", error.response);
                    errorMsg = error.response.data.error.message;
                });
        } else if (!val.s && !provider) {
            errorMsg = "Password not strong enough";
        }
        // Sendgrid
        if (!errorMsg) {
            loading = true;
            document.documentElement.scrollTop = 0;

            // Account for missing altMail & province
            if (!val.altMail) val.altMail = "null@null.com";
            if (!val.province) val.province = "NA";

            await axios
                .put(
                    "https://sendgrid.com/v3/marketing/contacts",
                    {
                        list_ids: [sendgridList],
                        contacts: [
                            {
                                email: val.email,
                                alternate_emails: [val.altMail],
                                first_name: val.firstName,
                                last_name: val.lastName,
                                state_province_region: val.province,
                                phone_number: val.cell,
                                custom_fields: { e1_T: ttCode },
                            },
                        ],
                    },
                    { headers: { Authorization: `Bearer ${sgKey}` } }
                )
                .then((response) => {
                    console.log("SG reponse: ", response.statusText, " ", response.data);
                    document.getElementById("register").reset();
                    password = "";
                    loading = false;
                    val = {};
                    idNum = "";
                })
                .catch((error) => {
                    console.error(error);
                });
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
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s" />
    </div>
{/if}

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    {#if registerNext && !provider}
                        <i
                            style="padding-top: 1.8rem; padding-left: 1.8rem;"
                            on:click={() => (registerNext = false)}
                            on:keydown={() => (registerNext = false)}
                            ><Icon data={arrowLeft} scale="2" /></i
                        >
                    {/if}
                    <div class="card-body p-md-3 p-lg-4 text-center">
                        <div class="mb-md-3">
                            <h2 class="fw-bold mb-2">REGISTER</h2>
                            {#if errorMsg}
                                <h4 class="error-col">{errorMsg}</h4>
                            {:else if msg}
                                <h4 class="success-col">{msg}</h4>
                            {/if}

                            {#if provider && !registered}
                                <p>Please complete your registration...</p>
                            {/if}

                            {#if registered}
                                <button
                                    class="btn btn-secondary mx-auto mt-3 mb-3 fw-bold fs-5"
                                    style="width: 300px;"
                                    on:click={() => goto("/login")}>Login Now</button
                                >
                            {/if}

                            <form id="register">
                                {#if !registerNext}
                                    <div class="mt-4 google-box">
                                        <button
                                            id="google-sso"
                                            class="Sso__button Sso__googleIdButton"
                                            on:click={() =>
                                                goto(
                                                    "https://tt-strapi.glass.thinkteacher.co.za/api/connect/google"
                                                )}
                                        >
                                            Continue with Google
                                        </button>
                                        <div class="Sso__divider ">
                                            <span class="Sso__dividerLine" />
                                            <span class="Sso__dividerText">or</span>
                                            <span class="Sso__dividerLine" />
                                        </div>
                                    </div>

                                    <div class="form-outline form-white mb-2">
                                        <label class="form-label" for="Username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            class="form-control form-control-lg"
                                            placeholder="username"
                                            bind:value={val.username}
                                            required
                                        />
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
                                                />
                                            </div>
                                            <p style={val.s || "color:red"}>
                                                {val.s
                                                    ? "Strong password"
                                                    : "Password not strong enough. Try using a mix of capital letters, numbers and special characters with a length > 8."}
                                            </p>
                                        {/if}
                                    </div>

                                    <button
                                        class="btn btn-outline-light btn-lg px-4"
                                        on:click|preventDefault={() => (registerNext = true)}
                                        disabled={!loginSchema.isValidSync(val)}>Next</button
                                    >
                                {:else}
                                    <div class="row">
                                        <div class="col-sm-12 col-md-6">
                                            <label class="form-label" for="name">First Name</label>
                                            <input
                                                type="text"
                                                name="username"
                                                id="name"
                                                class="form-control form-control-lg"
                                                placeholder="First Name"
                                                bind:value={val.firstName}
                                                required
                                            />
                                        </div>
                                        <div class="col-sm-12 col-md-6">
                                            <label class="form-label" for="surname">Surname</label>
                                            <input
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                class="form-control form-control-lg"
                                                placeholder="Surname"
                                                bind:value={val.lastName}
                                                required
                                            />
                                        </div>
                                        <div class="col-sm-12 col-md-6 mt-3">
                                            <label class="form-label" for="eduPhase"
                                                >Education Phase</label
                                            >
                                            <select
                                                class="form-select"
                                                id="eduPhase"
                                                aria-label="Education Phase"
                                                bind:value={val.eduPhase}
                                                required
                                            >
                                                <option value="" selected>choose phase</option>
                                                <option value="early_childhood_development"
                                                    >Early Childhood Development</option
                                                >
                                                <option value="foundation_phase"
                                                    >Foundation Phase</option
                                                >
                                                <option value="intermediate_phase"
                                                    >Intermediate Phase</option
                                                >
                                                <option value="senior_phase">Senior Phase</option>
                                                <option value="further_education"
                                                    >Further Education</option
                                                >
                                                <option value="training_phase"
                                                    >Training Phase</option
                                                >
                                            </select>
                                        </div>
                                        <div class="col-sm-12 col-md-6 mt-3">
                                            <label class="form-label" for="cell">Cell Number</label>
                                            <input
                                                type="tel"
                                                name="cell"
                                                id="cell"
                                                class="form-control form-control-lg"
                                                placeholder="Cell number"
                                                bind:value={val.cell}
                                                min="0"
                                                max="9999999999999"
                                                required
                                            />
                                        </div>
                                        <div class="col-4 mt-3">
                                            <label
                                                class="form-label form-check-label"
                                                for="nationality">South African</label
                                            >
                                            <div class="form-switch d-flex justify-content-center">
                                                <input
                                                    class="form-check-input form-control"
                                                    type="checkbox"
                                                    role="switch"
                                                    id="nationality"
                                                    bind:checked={nationality}
                                                />
                                            </div>
                                        </div>
                                        <div class="col-8 mt-3">
                                            <label class="form-label" for="idNum">ID Number</label>
                                            <input
                                                type="text"
                                                name="idNumber"
                                                id="idNum"
                                                class="form-control form-control-lg"
                                                placeholder={nationality
                                                    ? "SA ID number"
                                                    : "Country ID / Passport number"}
                                                bind:value={idNum}
                                                required
                                            />
                                            {#if idNum && nationality}
                                                <small style={val.isValidID || "color:red"}>
                                                    {val.isValidID ? "Valid" : "Not a valid"} ID
                                                </small>
                                            {/if}
                                        </div>
                                        <div class="col-sm-12 col-md-6 mt-3">
                                            <label class="form-label" for="sace">SACE Number</label
                                            ><small class="text-danger"
                                                >&nbsp;&nbsp;&nbsp;&nbsp;*optional</small
                                            >
                                            <input
                                                type="text"
                                                name="sace"
                                                id="sace"
                                                class="form-control form-control-lg"
                                                placeholder="SACE number"
                                                bind:value={val.sace}
                                            />
                                        </div>
                                        <div class="col-sm-12 col-md-6 mt-3">
                                            <label class="form-label" for="qual"
                                                >Qualification</label
                                            ><small class="text-danger"
                                                >&nbsp;&nbsp;&nbsp;&nbsp;*optional</small
                                            >
                                            <input
                                                type="text"
                                                name="qual"
                                                id="qual"
                                                class="form-control form-control-lg"
                                                placeholder="Qualification"
                                                bind:value={val.qualification}
                                            />
                                        </div>
                                        <div class="col-12 mt-3">
                                            <label class="form-label" for="altEmail"
                                                >Alternative Email</label
                                            ><small class="text-danger"
                                                >&nbsp;&nbsp;&nbsp;&nbsp;*optional</small
                                            >
                                            <input
                                                type="email"
                                                id="altEmail"
                                                class="form-control form-control-lg"
                                                placeholder="alternative email"
                                                bind:value={val.altMail}
                                            />
                                        </div>
                                        <div class="col-12 mt-3">
                                            <label class="form-label" for="school"
                                                >School / Institution</label
                                            ><small class="text-danger"
                                                >&nbsp;&nbsp;&nbsp;&nbsp;*optional</small
                                            >
                                            <input
                                                type="text"
                                                name="school"
                                                id="school"
                                                class="form-control form-control-lg"
                                                placeholder="school or institution"
                                                bind:value={val.workplace}
                                            />
                                        </div>
                                        <div class="col-12 mt-2">
                                            <label class="form-label" for="province">Province</label
                                            ><small class="text-danger"
                                                >&nbsp;&nbsp;&nbsp;&nbsp;*optional</small
                                            >
                                            <select
                                                class="form-select"
                                                id="province"
                                                aria-label="Province"
                                                bind:value={val.province}
                                            >
                                                <option value="none" selected
                                                    >choose province</option
                                                >
                                                <option value="gauteng">Gauteng</option>
                                                <option value="free_state">Free State</option>
                                                <option value="western_cape">Western Cape</option>
                                                <option value="north_west">North West</option>
                                                <option value="northern_cape">Northern Cape</option>
                                                <option value="limpopo">Limpopo</option>
                                                <option value="kwazulu_natal">KwaZulu-Natal</option>
                                                <option value="mpumalanga">Mpumalanga</option>
                                                <option value="eastern_cape">Eastern Cape</option>
                                            </select>
                                        </div>
                                        <div class="form-check text-center mt-3 col-12">
                                            <label for="flexCheckDefault">
                                                Terms and Conditions, available <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/Think_Teacher_Member_Terms_and_Conditions_Final_draft_34d3c8193b_5cba9e92f3.pdf"
                                                    >here</a
                                                >.
                                            </label>
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                bind:checked={val.terms}
                                                value=""
                                                id="flexCheckDefault"
                                            />
                                            <br />
                                            <small class="text-danger"
                                                >&nbsp;&nbsp;&nbsp;&nbsp;*Please check the T&Cs
                                                above</small
                                            >
                                        </div>
                                    </div>

                                    <button
                                        class="btn btn-outline-light btn-lg px-4 mt-3"
                                        type="submit"
                                        on:click|preventDefault={registerUser}
                                        disabled={!userSchema.isValidSync(val)}>Register</button
                                    >
                                {/if}
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

<style>
    i {
        cursor: pointer;
    }
    .form-check .form-check-input:checked {
        background-color: var(--logo-gold);
        border-color: black;
    }
    .form-check .form-check-input {
        border-color: black;
        padding: 10px;
    }
    .form-check .form-check-input {
        float: none;
        margin-left: 1.5em;
    }
</style>
