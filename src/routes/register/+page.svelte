<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import Icon from "$lib/Icons/icon.svelte";
    import { arrowLeft, eye, eyeSlash } from "$lib/Icons/icons";
    import { sgKey, sendgridList, API_URL, toastSuc, toastErr } from "$lib/env.js";
    import z from "zxcvbn";
    import { onMount, onDestroy } from "svelte";
    import { id, name } from "$lib/stores";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string, boolean, number } from "yup";
    import { toast } from "@zerodevx/svelte-toast";

    onMount(() => {
        $id = localStorage.getItem("id");

        if (sessionStorage.getItem("provider") == "google") {
            registerNext = true;
            provider = true;
        }

        if (provider && !registered){
            toast.push("Please complete your registration...", toastErr);
        }
    });

    onDestroy(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.clear();
            sessionStorage.clear();
        }
        $name = null;
    });

    function success() {
        toast.push("Registered successfully!", toastSuc);
        registerNext = false;
        registered = true;
        goto("/benefits");
        localStorage.clear();
        sessionStorage.clear();
    }

    let cellErr = null;
    $: userSchema
        .validateAt('cell', val).then(() => {
            cellErr = null;
        })
        .catch((err) => {
            cellErr = err.message;
        });

    // Cell phone validation regex
    let cellRegex = new RegExp(
        "^(\\+27|0|27)(1|6|7|8|9)([0-9]{8})$",
        "g"
    );
    let loginSchema = object({
        email: string().email().required(),
        s: boolean().required().isTrue(),
    });
    let userSchema = object({
        firstName: string().required(),
        lastName: string().required(),
        cell: string().matches(cellRegex, "Phone number is not valid").required(),
        eduPhase: string().required(),
        qualification: string().nullable(),
        sace: string().nullable(),
        workplace: string().nullable(),
        province: string().nullable(),
        terms: boolean().required().isTrue(),

        // New
        idNumber: string().length(13, 'ID Number must be exactly 13 characters').required('ID Number is required'),
        teachingPhase: object({
            early_learning: boolean().required(),
            foundation: boolean().required(),
            intermediate: boolean().required(),
            get: boolean().required(),
            fet: boolean().required(),
        }),
        subjects: string().when('teachingPhase', {
            is: (val) => val.get || val.fet,
            then: () => string().required('At least one subject/learning area is required'),
            otherwise:() => string().nullable(),
        }),
        experience: number().integer().required(),
        position: object({
            intern: boolean().required(),
            locum: boolean().required(),
            full_time: boolean().required(),
            tutor: boolean().required(),
            mentor: boolean().required(),
        }),
        address: object().when('position', {
            is: (val) => val.locum,
            then: () => object({
                street: string().required(),
                city: string().required(),
                postalCode: string().required(),
            }),
            otherwise: () => object().nullable(),
        }),
        teachingPreference: string().oneOf(['in_person', 'online', 'hybrid'], 'Invalid preference').required('Preference is required'),
        qualifications: string().required('Qualification is required'),
        references: string().required('Reference is required'),
        languages: object({
            english: boolean().required(),
            afrikaans: boolean().required(),
            isi_ndebele: boolean().required(),
            isi_xhosa: boolean().required(),
            isi_zulu: boolean().required(),
            sesotho: boolean().required(),
            setswana: boolean().required(),
            sepedi: boolean().required(),
            si_swati: boolean().required(),
            tshivenda: boolean().required(),
            xitsonga: boolean().required(),
        })
    });

    let val = {
        teachingPhase: {
            early_learning: false,
            foundation: false,
            intermediate: false,
            get: false,
            fet: false,
        },
        position: {
            intern: false,
            locum: false,
            full_time: false,
            tutor: false,
            mentor: false,
        },
        languages: {
            english: false,
            afrikaans: false,
            isi_ndebele: false,
            isi_xhosa: false,
            isi_zulu: false,
            sesotho: false,
            setswana: false,
            sepedi: false,
            si_swati: false,
            tshivenda: false,
            xitsonga: false,
        },
        address: {
            street: "",
            city: "",
            province: "",
            postalCode: "",
        }
    };
    
    // Disable button
    let loading = false,
        password = "";

    let errorMsg = null;
    let regError = false;
    let registerNext = false,
        registered = false,
        provider = false;

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
        if (provider) {
            await axios
                .put(
                    `${API_URL}/users/${$id}`,
                    {
                        firstName: val.firstName,
                        lastName: val.lastName,
                        cell: val.cell,
                        eduPhase: val.eduPhase,
                        qualification: val.qualification,
                        sace: val.sace,
                        workplace: val.workplace,
                        province: val.province,
                        ttCode: ttCode,
                        // New fields
                        idNumber: val.idNumber,
                        teachingPhase: val.teachingPhase,
                        subjects: val.subjects,
                        experience: val.experience,
                        position: val.position,
                        address: val.position.locum ? val.address : null,
                        teachingPreference: val.teachingPreference,
                        qualifications: val.qualifications,
                        references: val.references,
                        languages: val.languages
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt"),
                        },
                    }
                )
                .then((response) => {
                    console.log("User profile", response.data.user);
                    success();
                    email = response.data.email;
                })
                .catch((error) => {
                    console.log("An error occurred:", error.response);
                    toast.push(error.response.data.error.message, toastErr);
                    regError = true;
                });
        }
        if (val.s && !provider) {
            errorMsg = null;
            await axios
                .post(`${API_URL}/auth/local/register`, {
                    username: val.email,
                    email: val.email,
                    password: password,
                    firstName: val.firstName,
                    lastName: val.lastName,
                    cell: val.cell,
                    eduPhase: val.eduPhase,
                    qualification: val.qualification,
                    sace: val.sace,
                    workplace: val.workplace,
                    province: val.province,
                    ttCode: ttCode,
                    // New fields
                    idNumber: val.idNumber,
                    teachingPhase: val.teachingPhase,
                    subjects: val.subjects,
                    experience: val.experience,
                    position: val.position,
                    address: val.position.locum ? val.address : null,
                    teachingPreference: val.teachingPreference,
                    qualifications: val.qualifications,
                    references: val.references,
                    languages: val.languages
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
        } else if (!val.s && !provider) {
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
    <title>Create Profile | ThinkTeacher</title>
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
                <div class="col-12 col-md-8 col-lg-8 col-xl-8">
                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                        {#if registerNext && !provider}
                            <div style="padding-top: 1.8rem; padding-left: 1.8rem;">
                                <button class="btn btn-link" on:click={() => (registerNext = false)}>
                                    <i><Icon data={arrowLeft} scale="2" /></i>
                                </button>
                            </div>
                        {/if}
                        <div class="card-body p-md-3 p-lg-4 text-center">
                            <div class="mb-md-3">
                                <h2 class="fw-bold mb-2 text-uppercase">Create Profile</h2>

                                {#if provider && !registered}
                                    <p>Please complete your registration...</p>
                                {/if}

                                <form id="register">
                                    {#if !registerNext}
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
                                            <div class="Sso__divider ">
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
                                                /></button>
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
                                            class="btn btn-outline-light btn-lg px-4"
                                            on:click|preventDefault={() => (registerNext = true)}
                                            disabled={!loginSchema.isValidSync(val)}>Next</button>
                                    {:else}
                                        <div class="row">
                                            <div class="col-sm-12 col-md-6">
                                                <label class="form-label" for="name">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstname"
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
                                            
                                            <!-- ID Number - New field -->
                                            <div class="col-sm-12 col-md-6 mt-3">
                                                <label class="form-label" for="idNumber">ID Number</label>
                                                <input
                                                    type="text"
                                                    name="idNumber"
                                                    id="idNumber"
                                                    class="form-control form-control-lg"
                                                    placeholder="ID Number"
                                                    bind:value={val.idNumber}
                                                    maxlength="13"
                                                    required
                                                />
                                            </div>
                                            
                                            <div class="col-sm-12 col-md-6 mt-3">
                                                <label class="form-label" for="eduPhase">Education Phase</label>
                                                <select
                                                    class="form-select"
                                                    id="eduPhase"
                                                    aria-label="Education Phase"
                                                    bind:value={val.eduPhase}
                                                    required
                                                >
                                                    <option value="" selected>choose phase</option>
                                                    <option value="early_childhood_development">Early Childhood Development</option>
                                                    <option value="foundation_phase">Foundation Phase</option>
                                                    <option value="intermediate_phase">Intermediate Phase</option>
                                                    <option value="senior_phase">Senior Phase</option>
                                                    <option value="further_education">Further Education</option>
                                                    <option value="training_phase">Training Phase</option>
                                                </select>
                                            </div>
                                            
                                            <!-- Teaching Phases - New field -->
                                            <div class="col-12 mt-3">
                                                <label class="form-label">Teaching Phases</label>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.teachingPhase.early_learning} id="earlyLearning">
                                                    <label class="form-check-label" for="earlyLearning">Early Learning</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.teachingPhase.foundation} id="foundation">
                                                    <label class="form-check-label" for="foundation">Foundation</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.teachingPhase.intermediate} id="intermediate">
                                                    <label class="form-check-label" for="intermediate">Intermediate</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.teachingPhase.get} id="get">
                                                    <label class="form-check-label" for="get">GET (General Education and Training)</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.teachingPhase.fet} id="fet">
                                                    <label class="form-check-label" for="fet">FET (Further Education and Training)</label>
                                                </div>
                                            </div>
                                            
                                            <!-- Subjects - New field (conditional) -->
                                            {#if val.teachingPhase.get || val.teachingPhase.fet}
                                                <div class="col-12 mt-3">
                                                    <label class="form-label" for="subjects">Subjects/Learning Areas</label>
                                                    <textarea 
                                                        id="subjects" 
                                                        class="form-control form-control-lg" 
                                                        placeholder="Enter subjects or learning areas you teach" 
                                                        bind:value={val.subjects}
                                                        required
                                                    ></textarea>
                                                </div>
                                            {/if}
                                            
                                            <!-- Experience - New field -->
                                            <div class="col-sm-12 col-md-6 mt-3">
                                                <label class="form-label" for="experience">Years of Experience</label>
                                                <input
                                                    type="number"
                                                    name="experience"
                                                    id="experience"
                                                    class="form-control form-control-lg"
                                                    placeholder="Years of experience"
                                                    bind:value={val.experience}
                                                    min="0"
                                                    required
                                                />
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
                                                {#if cellErr && val.cell && val.cell != ""}
                                                    <small class="text-error">{cellErr}</small>
                                                {/if}
                                            </div>
                                            
                                            <!-- Position - New field -->
                                            <div class="col-12 mt-3">
                                                <label class="form-label">Position</label>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.position.intern} id="intern">
                                                    <label class="form-check-label" for="intern">Intern</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.position.locum} id="locum">
                                                    <label class="form-check-label" for="locum">Locum</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.position.full_time} id="fullTime">
                                                    <label class="form-check-label" for="fullTime">Full Time</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.position.tutor} id="tutor">
                                                    <label class="form-check-label" for="tutor">Tutor</label>
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input class="form-check-input" type="checkbox" bind:checked={val.position.mentor} id="mentor">
                                                    <label class="form-check-label" for="mentor">Mentor</label>
                                                </div>
                                            </div>
                                            
                                            <!-- Address - New field (conditional on locum) -->
                                            {#if val.position.locum}
                                                <div class="col-12 mt-3">
                                                    <label class="form-label" for="street">Street Address</label>
                                                    <input
                                                        type="text"
                                                        name="street"
                                                        id="street"
                                                        class="form-control form-control-lg"
                                                        placeholder="Street address"
                                                        bind:value={val.address.street}
                                                        required
                                                    />
                                                </div>
                                                <div class="col-sm-12 col-md-6 mt-3">
                                                    <label class="form-label" for="city">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        class="form-control form-control-lg"
                                                        placeholder="City"
                                                        bind:value={val.address.city}
                                                        required
                                                    />
                                                </div>
                                                <div class="col-sm-12 col-md-6 mt-3">
                                                    <label class="form-label" for="addressProvince">Province</label>
                                                    <select
                                                        class="form-select"
                                                        id="addressProvince"
                                                        aria-label="Address Province"
                                                        bind:value={val.address.province}
                                                        required
                                                    >
                                                        <option value="" selected>choose province</option>
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
                                                <div class="col-sm-12 col-md-6 mt-3">
                                                    <label class="form-label" for="postalCode">Postal Code</label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        id="postalCode"
                                                        class="form-control form-control-lg"
                                                        placeholder="Postal code"
                                                        bind:value={val.address.postalCode}
                                                        required
                                                    />
                                                </div>
                                            {/if}
                                            
                                            <!-- Teaching Preference - New field -->
                                            <div class="col-12 mt-3">
                                                <label class="form-label" for="teachingPreference">Teaching Preference</label>
                                                <select
                                                    class="form-select"
                                                    id="teachingPreference"
                                                    aria-label="Teaching Preference"
                                                    bind:value={val.teachingPreference}
                                                    required
                                                >
                                                    <option value="" selected>choose preference</option>
                                                    <option value="in_person">In Person</option>
                                                    <option value="online">Online</option>
                                                    <option value="hybrid">Hybrid</option>
                                                </select>
                                            </div>
                                            
                                            <div class="col-sm-12 col-md-6 mt-3">
                                                <label class="form-label" for="sace">SACE Number</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                                <input
                                                    type="text"
                                                    name="sace"
                                                    id="sace"
                                                    class="form-control form-control-lg"
                                                    placeholder="SACE number"
                                                    bind:value={val.sace}
                                                />
                                            </div>
                                            
                                            <!-- Qualifications - New field -->
                                            <div class="col-12 mt-3">
                                                <label class="form-label" for="qualifications">Qualifications</label>
                                                <textarea 
                                                    id="qualifications" 
                                                    class="form-control form-control-lg" 
                                                    placeholder="List your qualifications" 
                                                    bind:value={val.qualifications}
                                                    required
                                                ></textarea>
                                            </div>

                                            <div class="col-sm-12 col-md-6 mt-3">
                                                <label class="form-label" for="qual">Qualification Type</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                                <input
                                                    type="text"
                                                    name="qual"
                                                    id="qual"
                                                    class="form-control form-control-lg"
                                                    placeholder="Qualification"
                                                    bind:value={val.qualification}
                                                />
                                            </div>
                                            
                                            <!-- References - New field -->
                                            <div class="col-12 mt-3">
                                                <label class="form-label" for="references">References</label>
                                                <textarea 
                                                    id="references" 
                                                    class="form-control form-control-lg" 
                                                    placeholder="Enter reference details" 
                                                    bind:value={val.references}
                                                    required
                                                ></textarea>
                                            </div>
                                            
                                            <!-- Languages - New field -->
                                            <div class="col-12 mt-3">
                                                <label class="form-label">Languages</label>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.english} id="english">
                                                            <label class="form-check-label" for="english">English</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.afrikaans} id="afrikaans">
                                                            <label class="form-check-label" for="afrikaans">Afrikaans</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.isi_ndebele} id="isiNdebele">
                                                            <label class="form-check-label" for="isiNdebele">isiNdebele</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.isi_xhosa} id="isiXhosa">
                                                            <label class="form-check-label" for="isiXhosa">isiXhosa</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.isi_zulu} id="isiZulu">
                                                            <label class="form-check-label" for="isiZulu">isiZulu</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.sesotho} id="sesotho">
                                                            <label class="form-check-label" for="sesotho">Sesotho</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.setswana} id="setswana">
                                                            <label class="form-check-label" for="setswana">Setswana</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.sepedi} id="sepedi">
                                                            <label class="form-check-label" for="sepedi">Sepedi</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.si_swati} id="siSwati">
                                                            <label class="form-check-label" for="siSwati">siSwati</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.tshivenda} id="tshivenda">
                                                            <label class="form-check-label" for="tshivenda">Tshivenda</label>
                                                        </div>
                                                        <div class="form-check text-start ms-4">
                                                            <input class="form-check-input" type="checkbox" bind:checked={val.languages.xitsonga} id="xitsonga">
                                                            <label class="form-check-label" for="xitsonga">Xitsonga</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-12 mt-3">
                                                <label class="form-label" for="school">School / Institution</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
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
                                                <label class="form-label" for="province">Province</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                                <select
                                                    class="form-select"
                                                    id="province"
                                                    aria-label="Province"
                                                    bind:value={val.province}
                                                >
                                                    <option value="none" selected>choose province</option>
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
                                                    >here</a>.
                                                </label>
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    bind:checked={val.terms}
                                                    value=""
                                                    id="flexCheckDefault"
                                                />
                                                <br />
                                                {#if !val.terms}
                                                    <small class="text-danger">Please accept the T&Cs above</small>
                                                {/if}
                                            </div>
                                        </div>

                                        <button
                                            class="btn btn-outline-light btn-lg px-4 mt-3"
                                            type="submit"
                                            on:click|preventDefault={registerUser}
                                            disabled={!userSchema.isValidSync(val)}>Register</button>
                                    {/if}
                                </form>
                            </div>

                            <div>
                                <p class="mb-0 mt-3">
                                    Already have an account? <a
                                        href="/login"
                                        class="text-white-50 fw-bold">Login</a>
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
    
    /* Additional styling for the new form fields */
    .text-error {
        color: #f8d7da;
    }
    
    .form-check.text-start .form-check-input {
        float: left;
        margin-left: -1.5em;
    }
</style>