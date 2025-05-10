<script>
    import { toastSuc, toastErr } from "$lib/env.js";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string } from "yup";
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";

    // Form will be needed from props as this is update-only
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
        terms: false,
        ttCode: "",
    };

    let val = $state(initialProfileData);
    let loadingForm = $state(false);
    let clientErrors = $state({});
    let cellErr = $state(null);
    let currentUserId = $state(null); // To store the current user ID

    onMount(() => {
        currentUserId = localStorage.getItem("id");
        console.log("User ID from localStorage:", currentUserId);
    });

    // Initialize form values
    $effect(() => {
        if (form?.data) {
            // If form was submitted and there were errors, repopulate with submitted values
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
            };
        } else if (data?.profile) {
            // If we have profile data from the server, use that
            console.log("Initializing form with existing profile data:", data.profile);
            val = {
                ...initialProfileData,
                ...data.profile,
                // Ensure nested objects are properly merged
                address: { ...initialProfileData.address, ...data.profile.address },
                teachingPhases: {
                    ...initialProfileData.teachingPhases,
                    ...data.profile.teachingPhases,
                },
                position: { ...initialProfileData.position, ...data.profile.position },
                languages: { ...initialProfileData.languages, ...data.profile.languages },
            };
        } else {
            // This shouldn't happen as the server should redirect if no profile exists
            console.error("No profile data available");
        }
    });
</script>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-10 col-lg-10 col-xl-10">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-3 p-lg-4 text-center">
                        <div class="mb-md-3">
                            <h2 class="fw-bold mb-2 text-uppercase">Update Profile</h2>
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
                                            toast.push("Profile updated successfully!", toastSuc);
                                        } else if (result.type === "failure") {
                                            toast.push(
                                                result.data?.message ||
                                                    "Error updating profile. Please check errors.",
                                                toastErr
                                            );
                                        }
                                        await update();
                                    };
                                }}
                            >
                                <!-- Hidden fields -->
                                <input type="hidden" name="profileId" value={data?.profile?.id} />
                                <input type="hidden" name="ttCode" bind:value={val.ttCode} />
                                {#if currentUserId}
                                    <input type="hidden" name="userId" value={currentUserId} />
                                {/if}

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

                                    <!-- Cell Number -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="cell">Cell Number</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="text"
                                            name="cell"
                                            id="cell"
                                            class="form-control form-control-lg"
                                            placeholder="Cell Number"
                                            bind:value={val.cell}
                                            required
                                        />
                                        {#if form?.errors?.cell}<small class="text-danger"
                                                >{form.errors.cell}</small
                                            >{/if}
                                        {#if cellErr}<small class="text-warning">{cellErr}</small
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
                                            placeholder="SACE Number"
                                            bind:value={val.sace}
                                            maxlength="7"
                                        />
                                        {#if form?.errors?.sace}<small class="text-danger"
                                                >{form.errors.sace}</small
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

                                    <!-- Actively Looking -->
                                    <div class="form-check form-switch mt-3 col-12">
                                        <label class="form-check-label" for="lookingSwitch"
                                            >Actively Looking?</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            style="width: 3rem; height: 1.2rem;"
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
                                    <div class="col-12 mt-3">
                                        <label class="form-label">Position</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="d-flex flex-wrap justify-content-center">
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
                                                <label class="form-check-label" for="locum"
                                                    >Locum</label
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
                                                <label class="form-check-label" for="tutor"
                                                    >Tutor</label
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
                                    </div>

                                    <!-- Teaching Phases -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label">Teaching Phases</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="d-flex flex-wrap justify-content-center">
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="teachingPhases.earlyLearning"
                                                    bind:checked={val.teachingPhases.earlyLearning}
                                                    id="earlyLearning"
                                                />
                                                <label class="form-check-label" for="earlyLearning"
                                                    >Early Learning</label
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
                                                <label class="form-check-label" for="get">GET</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="teachingPhases.fet"
                                                    bind:checked={val.teachingPhases.fet}
                                                    id="fet"
                                                />
                                                <label class="form-check-label" for="fet">FET</label
                                                >
                                            </div>
                                            {#if form?.errors?.teachingPhases}<small
                                                    class="text-danger"
                                                    >{typeof form.errors.teachingPhases === "string"
                                                        ? form.errors.teachingPhases
                                                        : "Error in teaching phases section"}</small
                                                >{/if}
                                        </div>
                                    </div>

                                    <!-- Subjects -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="subjects"
                                            >Subjects/Learning Areas</label
                                        ><small class="text-danger"
                                            >&nbsp;&nbsp;*required if GET or FET selected</small
                                        >
                                        <input
                                            type="text"
                                            name="subjects"
                                            id="subjects"
                                            class="form-control form-control-lg"
                                            placeholder="Subjects/Learning Areas"
                                            bind:value={val.subjects}
                                        />
                                        {#if form?.errors?.subjects}<small class="text-danger"
                                                >{form.errors.subjects}</small
                                            >{/if}
                                    </div>

                                    <!-- Experience -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="experience"
                                            >Years of Experience</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="number"
                                            name="experience"
                                            id="experience"
                                            class="form-control form-control-lg"
                                            placeholder="Years of Experience"
                                            bind:value={val.experience}
                                            min="0"
                                            required
                                        />
                                        {#if form?.errors?.experience}<small class="text-danger"
                                                >{form.errors.experience}</small
                                            >{/if}
                                    </div>

                                    <!-- Address -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label">Address</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="row">
                                            <div class="col-12">
                                                <input
                                                    type="text"
                                                    name="address.street"
                                                    class="form-control form-control-lg"
                                                    placeholder="Street Address"
                                                    bind:value={val.address.street}
                                                    required
                                                />
                                                {#if form?.errors?.["address.street"]}<small
                                                        class="text-danger"
                                                        >{form.errors["address.street"]}</small
                                                    >{/if}
                                            </div>
                                            <div class="col-md-4 mt-3">
                                                <input
                                                    type="text"
                                                    name="address.city"
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
                                            <div class="col-md-4 mt-3">
                                                <input
                                                    type="text"
                                                    name="address.postalCode"
                                                    class="form-control form-control-lg"
                                                    placeholder="Postal Code"
                                                    bind:value={val.address.postalCode}
                                                    required
                                                />
                                                {#if form?.errors?.["address.postalCode"]}<small
                                                        class="text-danger"
                                                        >{form.errors["address.postalCode"]}</small
                                                    >{/if}
                                            </div>
                                            <div class="col-md-4 mt-3">
                                                <select
                                                    name="address.province"
                                                    class="form-select form-select-lg"
                                                    bind:value={val.address.province}
                                                    required
                                                >
                                                    <option value="">Select Province</option>
                                                    <option value="gauteng">Gauteng</option>
                                                    <option value="free_state">Free State</option>
                                                    <option value="western_cape"
                                                        >Western Cape</option
                                                    >
                                                    <option value="north_west">North West</option>
                                                    <option value="northern_cape"
                                                        >Northern Cape</option
                                                    >
                                                    <option value="limpopo">Limpopo</option>
                                                    <option value="kwazulu_natal"
                                                        >KwaZulu-Natal</option
                                                    >
                                                    <option value="mpumalanga">Mpumalanga</option>
                                                    <option value="eastern_cape"
                                                        >Eastern Cape</option
                                                    >
                                                </select>
                                                {#if form?.errors?.["address.province"]}<small
                                                        class="text-danger"
                                                        >{form.errors["address.province"]}</small
                                                    >{/if}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Teaching Preference -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="teachingPreference"
                                            >Teaching Preference</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <select
                                            name="teachingPreference"
                                            id="teachingPreference"
                                            class="form-select form-select-lg"
                                            bind:value={val.teachingPreference}
                                            required
                                        >
                                            <option value="">Select Preference</option>
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
                                        <label class="form-label">Qualifications</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        {#each val.qualifications as qualification, i}
                                            <div class="row mt-2">
                                                <div class="col-md-6">
                                                    <input
                                                        type="text"
                                                        name="qualifications[{i}].title"
                                                        class="form-control form-control-lg"
                                                        placeholder="Qualification Title"
                                                        bind:value={qualification.title}
                                                        required
                                                    />
                                                    {#if form?.errors?.[`qualifications[${i}].title`]}<small
                                                            class="text-danger"
                                                            >{form.errors[
                                                                `qualifications[${i}].title`
                                                            ]}</small
                                                        >{/if}
                                                </div>
                                                <div class="col-md-6">
                                                    <input
                                                        type="text"
                                                        name="qualifications[{i}].organisation"
                                                        class="form-control form-control-lg"
                                                        placeholder="Organisation"
                                                        bind:value={qualification.organisation}
                                                        required
                                                    />
                                                    {#if form?.errors?.[`qualifications[${i}].organisation`]}<small
                                                            class="text-danger"
                                                            >{form.errors[
                                                                `qualifications[${i}].organisation`
                                                            ]}</small
                                                        >{/if}
                                                </div>
                                                <div class="col-md-3 mt-2">
                                                    <input
                                                        type="number"
                                                        name="qualifications[{i}].nqf"
                                                        class="form-control form-control-lg"
                                                        placeholder="NQF Level"
                                                        bind:value={qualification.nqf}
                                                        min="1"
                                                        max="10"
                                                        required
                                                    />
                                                    {#if form?.errors?.[`qualifications[${i}].nqf`]}<small
                                                            class="text-danger"
                                                            >{form.errors[
                                                                `qualifications[${i}].nqf`
                                                            ]}</small
                                                        >{/if}
                                                </div>
                                                <div class="col-md-3 mt-2">
                                                    <input
                                                        type="date"
                                                        name="qualifications[{i}].from"
                                                        class="form-control form-control-lg"
                                                        placeholder="Start Date"
                                                        bind:value={qualification.from}
                                                        required
                                                    />
                                                    {#if form?.errors?.[`qualifications[${i}].from`]}<small
                                                            class="text-danger"
                                                            >{form.errors[
                                                                `qualifications[${i}].from`
                                                            ]}</small
                                                        >{/if}
                                                </div>
                                                <div class="col-md-3 mt-2">
                                                    <input
                                                        type="date"
                                                        name="qualifications[{i}].to"
                                                        class="form-control form-control-lg"
                                                        placeholder="End Date"
                                                        bind:value={qualification.to}
                                                        disabled={qualification.ongoing}
                                                    />
                                                    {#if form?.errors?.[`qualifications[${i}].to`]}<small
                                                            class="text-danger"
                                                            >{form.errors[
                                                                `qualifications[${i}].to`
                                                            ]}</small
                                                        >{/if}
                                                </div>
                                                <div class="col-md-3 mt-2">
                                                    <div class="form-check">
                                                        <input
                                                            class="form-check-input"
                                                            type="checkbox"
                                                            name="qualifications[{i}].ongoing"
                                                            bind:checked={qualification.ongoing}
                                                            id="ongoing{i}"
                                                        />
                                                        <label
                                                            class="form-check-label"
                                                            for="ongoing{i}">Ongoing</label
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        {/each}
                                        <button
                                            type="button"
                                            class="btn btn-outline-light btn-sm mt-2"
                                            on:click={() => {
                                                val.qualifications = [
                                                    ...val.qualifications,
                                                    {
                                                        title: "",
                                                        organisation: "",
                                                        nqf: "",
                                                        from: "",
                                                        to: "",
                                                        ongoing: false,
                                                    },
                                                ];
                                            }}
                                        >
                                            Add Another Qualification
                                        </button>
                                    </div>

                                    <!-- References -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="references">References</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <textarea
                                            name="references"
                                            id="references"
                                            class="form-control form-control-lg"
                                            placeholder="References"
                                            bind:value={val.references}
                                            required
                                        ></textarea>
                                        {#if form?.errors?.references}<small class="text-danger"
                                                >{form.errors.references}</small
                                            >{/if}
                                    </div>

                                    <!-- Languages -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label">Languages</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="d-flex flex-wrap justify-content-center">
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.english"
                                                    bind:checked={val.languages.english}
                                                    id="english"
                                                />
                                                <label class="form-check-label" for="english"
                                                    >English</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.afrikaans"
                                                    bind:checked={val.languages.afrikaans}
                                                    id="afrikaans"
                                                />
                                                <label class="form-check-label" for="afrikaans"
                                                    >Afrikaans</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.isi_ndebele"
                                                    bind:checked={val.languages.isi_ndebele}
                                                    id="isi_ndebele"
                                                />
                                                <label class="form-check-label" for="isi_ndebele"
                                                    >isiNdebele</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.isi_xhosa"
                                                    bind:checked={val.languages.isi_xhosa}
                                                    id="isi_xhosa"
                                                />
                                                <label class="form-check-label" for="isi_xhosa"
                                                    >isiXhosa</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.isi_zulu"
                                                    bind:checked={val.languages.isi_zulu}
                                                    id="isi_zulu"
                                                />
                                                <label class="form-check-label" for="isi_zulu"
                                                    >isiZulu</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.sesotho"
                                                    bind:checked={val.languages.sesotho}
                                                    id="sesotho"
                                                />
                                                <label class="form-check-label" for="sesotho"
                                                    >Sesotho</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.setswana"
                                                    bind:checked={val.languages.setswana}
                                                    id="setswana"
                                                />
                                                <label class="form-check-label" for="setswana"
                                                    >Setswana</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.sepedi"
                                                    bind:checked={val.languages.sepedi}
                                                    id="sepedi"
                                                />
                                                <label class="form-check-label" for="sepedi"
                                                    >Sepedi</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.si_swati"
                                                    bind:checked={val.languages.si_swati}
                                                    id="si_swati"
                                                />
                                                <label class="form-check-label" for="si_swati"
                                                    >siSwati</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.tshivenda"
                                                    bind:checked={val.languages.tshivenda}
                                                    id="tshivenda"
                                                />
                                                <label class="form-check-label" for="tshivenda"
                                                    >Tshivenda</label
                                                >
                                            </div>
                                            <div class="form-check text-start ms-4">
                                                <input
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    name="languages.xitsonga"
                                                    bind:checked={val.languages.xitsonga}
                                                    id="xitsonga"
                                                />
                                                <label class="form-check-label" for="xitsonga"
                                                    >Xitsonga</label
                                                >
                                            </div>
                                            {#if form?.errors?.languages}<small class="text-danger"
                                                    >{typeof form.errors.languages === "string"
                                                        ? form.errors.languages
                                                        : "Error in languages section"}</small
                                                >{/if}
                                        </div>
                                    </div>

                                    <!-- Terms -->
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
                                        Update Profile
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
</style>
