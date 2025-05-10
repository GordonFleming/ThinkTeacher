<script>
    import { toastSuc, toastErr } from "$lib/env.js";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string } from "yup";
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
    import { languages } from "$lib/data.js";
    // Form will only be needed from props as this is create-only now
    const { form, data } = $props();

    // Initial profile data
    let initialProfileData = {
        firstName: "",
        lastName: "",
        cell: "",
        sace: "",
        idNumber: "",
        dateOfBirth: "",
        looking: true,
        teachingPhases: {
            earlyLearning: false,
            foundation: false,
            intermediate: false,
            get: false,
            fet: false,
        },
        subjects: "",
        experience: 0,
        position: {
            intern: false,
            locum: false,
            full_time: false,
            tutor: false,
            mentor: false,
        },
        address: { street: "", city: "", postalCode: "", province: "" },
        teachingPreference: "",
        qualifications: [
            {
                title: "",
                organisation: "",
                nqf: "",
                from: "",
                to: "",
                ongoing: false,
            },
        ],
        references: "",
        languages: {
            motherTongue: "",
            additional: [],
        },
        terms: false,
        ttCode: "", // Will be generated
    };

    let val = $state(initialProfileData);
    let loadingForm = $state(false);
    let clientErrors = $state({});
    let cellErr = $state(null);

    onMount(async () => {
        // Generate TT code if not already set
        if (!val.ttCode) {
            val.ttCode = generateTtCode();
        }
    });

    // Generate TTCode for new profile
    function generateTtCode() {
        let code = "TT";
        const dateObj = new Date();
        const dateNow = dateObj
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "");
        code += dateNow;
        code += Math.floor(Math.random() * 899 + 100);
        return code;
    }

    // Initialize form values
    $effect(() => {
        if (form?.data) {
            console.log("Repopulating form with data from failed submission:", form.data);
            val = {
                ...initialProfileData,
                ...form.data,
                // Ensure nested objects are properly merged
                address: { ...initialProfileData.address, ...form.data.address },
                teachingPhases: {
                    ...initialProfileData.teachingPhases,
                    ...form.data.teachingPhases,
                },
                position: { ...initialProfileData.position, ...form.data.position },
                languages: { ...initialProfileData.languages, ...form.data.languages },
                // Ensure qualifications are properly handled
                qualifications:
                    form.data.qualifications?.map((qual) => ({
                        ...qual,
                        nqf: qual.nqf?.toString() || "", // Convert to string for select binding
                        ongoing: Boolean(qual.ongoing),
                    })) || initialProfileData.qualifications,
                // Preserve ttCode if it exists
                ttCode: form.data.ttCode || val.ttCode || generateTtCode(),
            };
        } else {
            // New profile initialization
            val = { ...initialProfileData, ttCode: generateTtCode() };
            console.log("New profile form initialized");
        }
    });

    // Client-side validation for immediate feedback
    let cellRegex = new RegExp("^(\\+27|0|27)(1|6|7|8|9)([0-9]{8})$", "g");

    // Validate cell number as user types
    $effect(() => {
        if (val.cell) {
            object({ cell: string().matches(cellRegex, "Phone number is not valid") })
                .validateAt("cell", { cell: val.cell })
                .then(() => (cellErr = null))
                .catch((err) => (cellErr = err.message));
        } else {
            cellErr = null;
        }
    });

    // Functions to manage qualifications array
    function addQualification() {
        val.qualifications = [
            ...val.qualifications,
            { title: "", organisation: "", nqf: "", from: "", to: "", ongoing: false },
        ];
    }
    function removeQualification(idx) {
        val.qualifications = val.qualifications.filter((_, i) => i !== idx);
    }
</script>

<svelte:head>
    <title>Create Profile | ThinkTeacher</title>
    <meta name="description" content="Create your ThinkTeacher profile!" />
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-10 col-lg-10 col-xl-10">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-3 p-lg-4 text-center">
                        <div class="mb-md-3">
                            <h2 class="fw-bold mb-2 text-uppercase">Create Profile</h2>
                            <h3>Your digital CV</h3>

                            {#if form?.message}
                                <div class="alert alert-danger" role="alert">
                                    {form.message}
                                </div>
                            {/if}
                            {#if clientErrors.form}
                                <div class="alert alert-warning" role="alert">
                                    {clientErrors.form}
                                </div>
                            {/if}

                            <form
                                method="POST"
                                use:enhance={() => {
                                    loadingForm = true;
                                    return async ({ result, update }) => {
                                        loadingForm = false;
                                        if (
                                            result.type === "success" ||
                                            result.type === "redirect"
                                        ) {
                                            toast.push("Profile created successfully!", toastSuc);
                                        } else if (result.type === "failure") {
                                            toast.push(
                                                result.data?.message ||
                                                    "Error saving profile. Please check errors.",
                                                toastErr
                                            );
                                        }
                                        await update();
                                    };
                                }}
                            >
                                <!-- Hidden field for ttCode -->
                                <input type="hidden" name="ttCode" bind:value={val.ttCode} />

                                <div class="row">
                                    <!-- First Name -->
                                    <div class="col-sm-12 col-md-6">
                                        <label class="form-label" for="name">First Name</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="name"
                                            class="form-control form-control-lg"
                                            placeholder="First Name"
                                            bind:value={val.firstName}
                                            required
                                        />
                                        {#if form?.errors?.firstName}<small class="text-danger"
                                                >{form.errors.firstName}</small
                                            >{/if}
                                        {#if clientErrors.firstName}<small class="text-warning"
                                                >{clientErrors.firstName}</small
                                            >{/if}
                                    </div>
                                    <!-- Last Name -->
                                    <div class="col-sm-12 col-md-6">
                                        <label class="form-label" for="surname">Surname</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="surname"
                                            class="form-control form-control-lg"
                                            placeholder="Surname"
                                            bind:value={val.lastName}
                                            required
                                        />
                                        {#if form?.errors?.lastName}<small class="text-danger"
                                                >{form.errors.lastName}</small
                                            >{/if}
                                    </div>

                                    <!-- ID Number -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="idNumber">ID Number</label
                                        ><small class="text-danger"
                                            >&nbsp;&nbsp;*required if no SACE number</small
                                        >
                                        <input
                                            type="text"
                                            name="idNumber"
                                            id="idNumber"
                                            class="form-control form-control-lg"
                                            placeholder="ID Number"
                                            bind:value={val.idNumber}
                                            maxlength="13"
                                        />
                                        {#if form?.errors?.idNumber}<small class="text-danger"
                                                >{form.errors.idNumber}</small
                                            >{/if}
                                    </div>
                                    <!-- SACE Number -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="sace">SACE Number</label
                                        ><small class="text-danger"
                                            >&nbsp;&nbsp;*required if no ID number</small
                                        >
                                        <input
                                            type="text"
                                            name="sace"
                                            id="sace"
                                            class="form-control form-control-lg"
                                            placeholder="SACE number"
                                            maxlength="7"
                                            minlength="7"
                                            bind:value={val.sace}
                                        />
                                        {#if form?.errors?.sace}<small class="text-danger"
                                                >{form.errors.sace}</small
                                            >{/if}
                                    </div>

                                    <!-- Date of Birth -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="dateOfBirth"
                                            >Date of Birth</label
                                        ><small class="text-danger"
                                            >&nbsp;&nbsp;*required if no ID number</small
                                        >
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            id="dateOfBirth"
                                            class="form-control form-control-lg mx-auto"
                                            style="width: auto;"
                                            bind:value={val.dateOfBirth}
                                        />
                                        {#if form?.errors?.dateOfBirth}<small class="text-danger"
                                                >{form.errors.dateOfBirth}</small
                                            >{/if}
                                    </div>

                                    <!-- Experience -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="experience"
                                            >Years of Experience</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="number"
                                            name="experience"
                                            id="experience"
                                            class="form-control form-control-lg mx-auto"
                                            style="width: auto;"
                                            placeholder="Years of experience"
                                            bind:value={val.experience}
                                            min="0"
                                            max="60"
                                            required
                                        />
                                        {#if form?.errors?.experience}<small class="text-danger"
                                                >{form.errors.experience}</small
                                            >{/if}
                                    </div>

                                    <!-- Actively Looking -->
                                    <div class="form-check form-switch mt-3 col-12">
                                        <label class="form-check-label" for="lookingSwitch"
                                            >Actively Looking?</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            style="width: 3rem; height: 1.4rem;"
                                            name="looking"
                                            bind:checked={val.looking}
                                            class="form-check-input"
                                            type="checkbox"
                                            id="lookingSwitch"
                                        />
                                        {#if form?.errors?.looking}<small class="text-danger"
                                                >{form.errors.looking}</small
                                            >{/if}
                                    </div>

                                    <!-- Position -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label"
                                            >Position you are interested in:</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <!-- Add name attributes like name="position.intern" -->
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.intern"
                                                bind:checked={val.position.intern}
                                                id="intern"
                                            />
                                            <label class="form-check-label" for="intern"
                                                >Intern</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.locum"
                                                bind:checked={val.position.locum}
                                                id="locum"
                                            />
                                            <label class="form-check-label" for="locum">Locum</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.full_time"
                                                bind:checked={val.position.full_time}
                                                id="fullTime"
                                            />
                                            <label class="form-check-label" for="fullTime"
                                                >Full Time</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.tutor"
                                                bind:checked={val.position.tutor}
                                                id="tutor"
                                            />
                                            <label class="form-check-label" for="tutor">Tutor</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.mentor"
                                                bind:checked={val.position.mentor}
                                                id="mentor"
                                            />
                                            <label class="form-check-label" for="mentor"
                                                >Mentor</label
                                            >
                                        </div>
                                        {#if form?.errors?.position}<small class="text-danger"
                                                >{typeof form.errors.position === "string"
                                                    ? form.errors.position
                                                    : "Error in position section"}</small
                                            >{/if}
                                    </div>

                                    <!-- Education Phase -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label">Education Phase</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <!-- Add name attributes like name="teachingPhases.earlyLearning" -->
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.earlyLearning"
                                                bind:checked={val.teachingPhases.earlyLearning}
                                                id="earlyLearning"
                                            />
                                            <label class="form-check-label" for="earlyLearning"
                                                >Early Learning Development</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.foundation"
                                                bind:checked={val.teachingPhases.foundation}
                                                id="foundation"
                                            />
                                            <label class="form-check-label" for="foundation"
                                                >Foundation</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.intermediate"
                                                bind:checked={val.teachingPhases.intermediate}
                                                id="intermediate"
                                            />
                                            <label class="form-check-label" for="intermediate"
                                                >Intermediate</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.get"
                                                bind:checked={val.teachingPhases.get}
                                                id="get"
                                            />
                                            <label class="form-check-label" for="get">GET</label>
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.fet"
                                                bind:checked={val.teachingPhases.fet}
                                                id="fet"
                                            />
                                            <label class="form-check-label" for="fet">FET</label>
                                        </div>
                                        {#if form?.errors?.teachingPhases}<small class="text-danger"
                                                >{typeof form.errors.teachingPhases === "string"
                                                    ? form.errors.teachingPhases
                                                    : "Error in teaching phases"}</small
                                            >{/if}
                                    </div>

                                    <!-- Subjects (conditional) -->
                                    {#if val.teachingPhases.get || val.teachingPhases.fet}
                                        <div class="col-12 mt-3">
                                            <label class="form-label" for="subjects"
                                                >Subjects/Learning Areas</label
                                            ><small class="text-danger">&nbsp;*</small>
                                            <textarea
                                                id="subjects"
                                                name="subjects"
                                                class="form-control form-control-lg"
                                                placeholder="Enter subjects"
                                                bind:value={val.subjects}
                                            ></textarea>
                                            {#if form?.errors?.subjects}<small class="text-danger"
                                                    >{form.errors.subjects}</small
                                                >{/if}
                                        </div>
                                    {/if}

                                    <!-- Teaching Preference -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="teachingPreference"
                                            >Teaching Preference</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <select
                                            class="form-select"
                                            name="teachingPreference"
                                            id="teachingPreference"
                                            bind:value={val.teachingPreference}
                                            required
                                        >
                                            <option value="" disabled>choose preference</option>
                                            <option value="in_person">In Person</option>
                                            <option value="online">Online</option>
                                            <option value="hybrid">Hybrid</option>
                                        </select>
                                        {#if form?.errors?.teachingPreference}<small
                                                class="text-danger"
                                                >{form.errors.teachingPreference}</small
                                            >{/if}
                                    </div>

                                    <!-- Qualifications -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label">Qualifications</label>
                                        <small class="text-danger">&nbsp;*</small>
                                        <div>
                                            {#each val.qualifications as qual, idx (idx)}
                                                <div class="card mb-3 p-3 text-white">
                                                    <div class="row g-2 align-items-end">
                                                        <div class="col-md-4">
                                                            <label class="form-label">Title</label>
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                name={`qualifications[${idx}].title`}
                                                                bind:value={qual.title}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label class="form-label"
                                                                >Organisation</label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                name={`qualifications[${idx}].organisation`}
                                                                bind:value={qual.organisation}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-3">
                                                            <label class="form-label"
                                                                >NQF Level</label
                                                            >
                                                            <select
                                                                class="form-select"
                                                                name={`qualifications[${idx}].nqf`}
                                                                bind:value={qual.nqf}
                                                                required
                                                            >
                                                                <option value="" disabled
                                                                    >Select</option
                                                                >
                                                                <option value="4"
                                                                    >NSC/Matric (NQF 4)</option
                                                                >
                                                                <option value="6"
                                                                    >Honours/PGCE (NQF 6)</option
                                                                >
                                                                <option value="7"
                                                                    >Masters/Bachelors (NQF 7)</option
                                                                >
                                                                <option value="8"
                                                                    >Doctorate (NQF 8)</option
                                                                >
                                                            </select>
                                                        </div>
                                                        <div
                                                            class="col-md-2 d-flex align-items-end"
                                                        >
                                                            {#if val.qualifications.length > 1}
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-danger btn-sm ms-2"
                                                                    on:click={() =>
                                                                        removeQualification(idx)}
                                                                    >remove</button
                                                                >
                                                            {/if}
                                                        </div>
                                                        <div class="col-md-3 mt-2">
                                                            <label class="form-label">From</label>
                                                            <input
                                                                type="date"
                                                                class="form-control"
                                                                name={`qualifications[${idx}].from`}
                                                                bind:value={qual.from}
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-3 mt-2">
                                                            {#if !qual.ongoing}
                                                                <label class="form-label">To</label>
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    name={`qualifications[${idx}].to`}
                                                                    bind:value={qual.to}
                                                                    disabled={qual.ongoing}
                                                                    required={!qual.ongoing}
                                                                />
                                                            {/if}
                                                        </div>
                                                        <div
                                                            class="col-md-2 mt-2 d-flex align-items-center"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                name={`qualifications[${idx}].ongoing`}
                                                                bind:checked={qual.ongoing}
                                                                id={`ongoing-${idx}`}
                                                                class="form-check-input p-1"
                                                            />
                                                            <label
                                                                for={`ongoing-${idx}`}
                                                                class="ms-2">Ongoing</label
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                            <button
                                                type="button"
                                                class="btn btn-outline-light btn-sm p-1 mt-2"
                                                on:click={addQualification}
                                                >+ Add Qualification</button
                                            >
                                        </div>
                                        {#if form?.errors?.qualifications}<small class="text-danger"
                                                >{form.errors.qualifications}</small
                                            >{/if}
                                    </div>
                                    <!-- References -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="references"
                                            >References...</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <textarea
                                            id="references"
                                            name="references"
                                            class="form-control form-control-lg"
                                            placeholder="Enter reference details"
                                            bind:value={val.references}
                                            required
                                        ></textarea>
                                        {#if form?.errors?.references}<small class="text-danger"
                                                >{form.errors.references}</small
                                            >{/if}
                                    </div>

                                    <!-- Languages -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label">Language Proficiency</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class="form-label">Mother Tongue</label>
                                                <select
                                                    class="form-select"
                                                    name="languages.motherTongue"
                                                    bind:value={val.languages.motherTongue}
                                                    required
                                                >
                                                    <option value="">Select mother tongue</option>
                                                    {#each languages as lang}
                                                        <option value={lang.code}
                                                            >{lang.name}</option
                                                        >
                                                    {/each}
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label"
                                                    >Additional Languages</label
                                                >
                                                <div class="additional-languages-container">
                                                    {#each languages as lang}
                                                        {#if lang.code !== val.languages.motherTongue}
                                                            <div class="form-check language-option">
                                                                <label
                                                                    class="form-check-label"
                                                                    for={`lang-${lang.code}`}
                                                                >
                                                                    {lang.name}
                                                                </label>
                                                                <input
                                                                    class="form-check-input"
                                                                    type="checkbox"
                                                                    id={`lang-${lang.code}`}
                                                                    value={lang.code}
                                                                    checked={val.languages.additional.includes(
                                                                        lang.code
                                                                    )}
                                                                    on:change={(e) => {
                                                                        if (e.target.checked) {
                                                                            val.languages.additional =
                                                                                [
                                                                                    ...val.languages
                                                                                        .additional,
                                                                                    lang.code,
                                                                                ];
                                                                        } else {
                                                                            val.languages.additional =
                                                                                val.languages.additional.filter(
                                                                                    (code) =>
                                                                                        code !==
                                                                                        lang.code
                                                                                );
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        {/if}
                                                    {/each}
                                                </div>
                                                <small class="text-muted mt-2 d-block">
                                                    Selected: {val.languages.additional.length} additional
                                                    {val.languages.additional.length === 1
                                                        ? "language"
                                                        : "languages"}
                                                </small>
                                            </div>
                                        </div>
                                        {#if form?.errors?.languages}<small class="text-danger"
                                                >{typeof form.errors.languages === "string"
                                                    ? form.errors.languages
                                                    : "Error in languages"}</small
                                            >{/if}
                                    </div>

                                    <!-- Address Fields: -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="street">Street Address</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="text"
                                            name="address.street"
                                            id="street"
                                            class="form-control form-control-lg"
                                            placeholder="Street address"
                                            bind:value={val.address.street}
                                            required
                                        />
                                        {#if form?.errors?.["address.street"]}<small
                                                class="text-danger"
                                                >{form.errors["address.street"]}</small
                                            >{/if}
                                    </div>
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="city">City</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <input
                                            type="text"
                                            name="address.city"
                                            id="city"
                                            class="form-control form-control-lg"
                                            placeholder="City"
                                            bind:value={val.address.city}
                                            required
                                        />
                                        {#if form?.errors?.["address.city"]}<small
                                                class="text-danger"
                                                >{form.errors["address.city"]}</small
                                            >{/if}
                                    </div>
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="addressProvince"
                                            >Province</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <select
                                            class="form-select"
                                            name="address.province"
                                            id="addressProvince"
                                            bind:value={val.address.province}
                                            required
                                        >
                                            <option value="" disabled>choose province</option>
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
                                        {#if form?.errors?.["address.province"]}<small
                                                class="text-danger"
                                                >{form.errors["address.province"]}</small
                                            >{/if}
                                    </div>
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="postalCode"
                                            >Postal Code</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="text"
                                            name="address.postalCode"
                                            id="postalCode"
                                            class="form-control form-control-lg"
                                            placeholder="Postal code"
                                            bind:value={val.address.postalCode}
                                            required
                                        />
                                        {#if form?.errors?.["address.postalCode"]}<small
                                                class="text-danger"
                                                >{form.errors["address.postalCode"]}</small
                                            >{/if}
                                    </div>

                                    <!-- Cell Number -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="cell">Cell Number</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="tel"
                                            name="cell"
                                            id="cell"
                                            class="form-control form-control-lg"
                                            placeholder="Cell number"
                                            bind:value={val.cell}
                                            required
                                        />
                                        {#if cellErr && val.cell}<small class="text-warning"
                                                >{cellErr}</small
                                            >{/if}
                                        {#if form?.errors?.cell}<small class="text-danger"
                                                >{form.errors.cell}</small
                                            >{/if}
                                    </div>

                                    <!-- Terms and Conditions -->
                                    <div class="form-check text-center mt-3 col-12">
                                        <label for="terms">
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
                                            name="terms"
                                            bind:checked={val.terms}
                                            id="terms"
                                        />
                                        <br />
                                        {#if !val.terms && (form?.errors?.terms || clientErrors.terms)}<small
                                                class="text-danger"
                                                >{form?.errors?.terms ||
                                                    clientErrors.terms ||
                                                    "Please accept the terms"}</small
                                            >{/if}
                                    </div>
                                </div>

                                {#if loadingForm}
                                    <div class="d-flex justify-content-center mt-5 mb-5">
                                        <Jumper
                                            size="150"
                                            color="#5C677D"
                                            unit="px"
                                            duration="1.4s"
                                        />
                                    </div>
                                {:else}
                                    <button
                                        class="btn btn-outline-light btn-lg px-4 mt-3"
                                        type="submit"
                                        disabled={loadingForm || !val.terms || cellErr}
                                    >
                                        Submit
                                    </button>
                                {/if}
                            </form>
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
    .text-error {
        color: #f8d7da;
    } /* Original style, maybe use Bootstrap's text-danger */
    .text-danger {
        color: #dc3545;
    } /* Bootstrap's danger color for server errors */
    .text-warning {
        color: #dfc148;
    } /* Bootstrap's warning for client errors */
    .form-check.text-start .form-check-input {
        float: left;
        margin-left: -1.5em;
    }
    .additional-languages-container {
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
        padding: 0.5rem;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .language-option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.25rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
    }
    .language-option:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
    .language-option .form-check-label {
        margin: 0;
        flex-grow: 1;
    }
    .language-option .form-check-input {
        margin: 0;
        float: none;
    }
    .language-option:last-child {
        margin-bottom: 0;
    }
</style>
