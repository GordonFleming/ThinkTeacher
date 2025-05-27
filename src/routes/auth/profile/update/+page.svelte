<script>
    import { toastSuc, toastErr } from "$lib/env.js";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string } from "yup";
    import { toast } from "@zerodevx/svelte-toast";
    import { enhance } from "$app/forms";
    import { languages } from "$lib/data.js";
    import dayjs from "dayjs";

    const { form, data } = $props();

    // Initial profile data structure - only includes editable fields for the update form
    let baseProfileStructure = {
        cell: "",
        sace: "",
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
        references: [{ name: "", email: "", phone: "", reference: "" }],
        languages: { motherTongue: "", additional: [] },
        id: null, // To store profileId, crucial for the form submission
    };

    let val = $state({ ...baseProfileStructure });
    let loadingForm = $state(false);
    let clientErrors = $state({}); // Keep for potential client-side validation beyond cell
    let cellErr = $state(null); // Specific for cell validation

    // Helper to format date for display or input type="date"
    function formatDateForInput(dateString) {
        if (!dateString) return "";
        return dayjs(dateString).format("YYYY-MM-DD");
    }

    $effect(() => {
        if (data?.profile) {
            console.log(
                "Prefilling form with profile data (editable fields only):",
                data.profile,
            );
            let newProfileData = { ...baseProfileStructure };

            // Populate common fields if they exist in data.profile and baseProfileStructure
            for (const key in newProfileData) {
                if (data.profile.hasOwnProperty(key)) {
                    if (
                        typeof data.profile[key] === "object" &&
                        data.profile[key] !== null &&
                        !Array.isArray(data.profile[key])
                    ) {
                        // For nested objects like address, teachingPhases, position, languages - merge them
                        newProfileData[key] = {
                            ...baseProfileStructure[key],
                            ...data.profile[key],
                        };
                        if (key === "languages") {
                            // Ensure 'additional' array is correctly handled
                            newProfileData.languages.additional =
                                data.profile.languages?.additional || [];
                        }
                    } else {
                        newProfileData[key] = data.profile[key];
                    }
                }
            }
            newProfileData.id = data.profile.id; // Crucial for submission

            // Specific handling for arrays like qualifications and references
            newProfileData.qualifications =
                data.profile.qualifications?.map((q) => ({
                    ...q,
                    from: formatDateForInput(q.from),
                    to: formatDateForInput(q.to),
                    nqf: q.nqf?.toString() || "",
                    ongoing: Boolean(q.ongoing),
                })) || baseProfileStructure.qualifications;

            newProfileData.references =
                data.profile.references || baseProfileStructure.references;

            val = newProfileData;
        } else if (form?.data) {
            // Repopulate from form submission if validation failed server-side
            console.log(
                "Repopulating form with data from failed submission (editable fields only):",
                form.data,
            );
            let repopulatedData = { ...baseProfileStructure };

            for (const key in repopulatedData) {
                if (form.data.hasOwnProperty(key)) {
                    // Ensure we only populate fields that are part of our defined editable structure
                    if (
                        typeof form.data[key] === "object" &&
                        form.data[key] !== null &&
                        !Array.isArray(form.data[key])
                    ) {
                        repopulatedData[key] = {
                            ...baseProfileStructure[key],
                            ...form.data[key],
                        };
                        if (key === "languages") {
                            // Ensure 'additional' array is correctly handled
                            repopulatedData.languages.additional =
                                form.data.languages?.additional || [];
                        }
                    } else {
                        repopulatedData[key] = form.data[key];
                    }
                }
            }
            // Ensure profileId is retained from the original data load if available, or form data
            repopulatedData.id = data?.profile?.id || form.data.id;

            // Specific handling for arrays from form.data
            repopulatedData.qualifications =
                form.data.qualifications?.map((q) => ({
                    ...q,
                    from: formatDateForInput(q.from), // Dates might be strings here already
                    to: formatDateForInput(q.to),
                    nqf: q.nqf?.toString() || "",
                    ongoing: Boolean(q.ongoing),
                })) || baseProfileStructure.qualifications;

            repopulatedData.references =
                form.data.references || baseProfileStructure.references;

            val = repopulatedData;
        } else if (!data?.profile && !form?.data) {
            // Should not happen on an update page if load function is correct
            // (i.e. redirects or throws error if no profile)
            console.error("Profile data is not available for update form.");
            // Optionally, show an error message to the user or redirect
        }
    });

    // Remove onMount that generates ttCode, it's now from loaded data.
    // Remove generateTtCode function.

    // Client-side validation for immediate feedback
    let cellRegex = new RegExp("^(\\+27|0|27)(1|6|7|8|9)([0-9]{8})$", "g");

    // Validate cell number as user types
    $effect(() => {
        if (val.cell) {
            object({
                cell: string().matches(cellRegex, "Phone number is not valid"),
            })
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
            {
                title: "",
                organisation: "",
                nqf: "",
                from: "",
                to: "",
                ongoing: false,
            },
        ];
    }
    function removeQualification(idx) {
        val.qualifications = val.qualifications.filter((_, i) => i !== idx);
    }

    // Add these functions after removeQualification:
    function addReference() {
        val.references = [
            ...val.references,
            { name: "", email: "", phone: "", reference: "" },
        ];
    }
    function removeReference(idx) {
        val.references = val.references.filter((_, i) => i !== idx);
    }
</script>

<svelte:head>
    <title>Update Profile | ThinkTeacher</title>
    <meta name="description" content="Update your ThinkTeacher profile!" />
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-10 col-lg-10 col-xl-10">
                <div
                    class="card bg-dark text-white"
                    style="border-radius: 1rem;"
                >
                    <div class="card-body p-md-3 p-lg-4 text-center">
                        <div class="mb-md-3">
                            <h2 class="fw-bold mb-2 text-uppercase">
                                Update Profile
                            </h2>
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
                                            toast.push(
                                                "Profile updated successfully!",
                                                toastSuc,
                                            );
                                        } else if (result.type === "failure") {
                                            toast.push(
                                                result.data?.message ||
                                                    "Error saving profile. Please check errors.",
                                                toastErr,
                                            );
                                        }
                                        await update();
                                    };
                                }}
                            >
                                <!-- Hidden field for profileId -->
                                {#if val.id}
                                    <input
                                        type="hidden"
                                        name="profileId"
                                        bind:value={val.id}
                                    />
                                {/if}

                                <div class="row">
                                    <!-- SACE Number -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="sace"
                                            >SACE Number</label
                                        ><small class="text-danger"
                                            >&nbsp;&nbsp;*required if no ID
                                            number (Note: ID number is not
                                            editable here)</small
                                        >
                                        <input
                                            type="text"
                                            name="sace"
                                            id="sace"
                                            class="form-control form-control-lg"
                                            placeholder="SACE number"
                                            maxlength="8"
                                            minlength="8"
                                            bind:value={val.sace}
                                        />
                                        {#if form?.errors?.sace}<small
                                                class="text-danger"
                                                >{form.errors.sace}</small
                                            >{/if}
                                    </div>

                                    <!-- Experience -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label
                                            class="form-label"
                                            for="experience"
                                            >Years of Experience</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
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
                                        {#if form?.errors?.experience}<small
                                                class="text-danger"
                                                >{form.errors.experience}</small
                                            >{/if}
                                    </div>

                                    <!-- Actively Looking -->
                                    <div
                                        class="form-check form-switch mt-3 col-12"
                                    >
                                        <label
                                            class="form-check-label"
                                            for="lookingSwitch"
                                            >Actively Looking?</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <input
                                            style="width: 3rem; height: 1.4rem;"
                                            name="looking"
                                            bind:checked={val.looking}
                                            class="form-check-input"
                                            type="checkbox"
                                            id="lookingSwitch"
                                        />
                                        {#if form?.errors?.looking}<small
                                                class="text-danger"
                                                >{form.errors.looking}</small
                                            >{/if}
                                    </div>

                                    <!-- Position -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label"
                                            >Position you are interested in:</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <!-- Add name attributes like name="position.intern" -->
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.intern"
                                                bind:checked={
                                                    val.position.intern
                                                }
                                                id="intern"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="intern">Intern</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.locum"
                                                bind:checked={
                                                    val.position.locum
                                                }
                                                id="locum"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="locum">Locum</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.full_time"
                                                bind:checked={
                                                    val.position.full_time
                                                }
                                                id="fullTime"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="fullTime">Full Time</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.tutor"
                                                bind:checked={
                                                    val.position.tutor
                                                }
                                                id="tutor"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="tutor">Tutor</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="position.mentor"
                                                bind:checked={
                                                    val.position.mentor
                                                }
                                                id="mentor"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="mentor">Mentor</label
                                            >
                                        </div>
                                        {#if form?.errors?.position}<small
                                                class="text-danger"
                                                >{typeof form.errors
                                                    .position === "string"
                                                    ? form.errors.position
                                                    : "Error in position section"}</small
                                            >{/if}
                                    </div>

                                    <!-- Education Phase -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label"
                                            >Education Phase</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <!-- Add name attributes like name="teachingPhases.earlyLearning" -->
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.earlyLearning"
                                                bind:checked={
                                                    val.teachingPhases
                                                        .earlyLearning
                                                }
                                                id="earlyLearning"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="earlyLearning"
                                                >Early Learning Development</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.foundation"
                                                bind:checked={
                                                    val.teachingPhases
                                                        .foundation
                                                }
                                                id="foundation"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="foundation"
                                                >Foundation</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.intermediate"
                                                bind:checked={
                                                    val.teachingPhases
                                                        .intermediate
                                                }
                                                id="intermediate"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="intermediate"
                                                >Intermediate</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.get"
                                                bind:checked={
                                                    val.teachingPhases.get
                                                }
                                                id="get"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="get">GET</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                name="teachingPhases.fet"
                                                bind:checked={
                                                    val.teachingPhases.fet
                                                }
                                                id="fet"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="fet">FET</label
                                            >
                                        </div>
                                        {#if form?.errors?.teachingPhases}<small
                                                class="text-danger"
                                                >{typeof form.errors
                                                    .teachingPhases === "string"
                                                    ? form.errors.teachingPhases
                                                    : "Error in teaching phases"}</small
                                            >{/if}
                                    </div>

                                    <!-- Subjects (conditional) -->
                                    {#if val.teachingPhases.get || val.teachingPhases.fet}
                                        <div class="col-12 mt-3">
                                            <label
                                                class="form-label"
                                                for="subjects"
                                                >Subjects/Learning Areas</label
                                            ><small class="text-danger"
                                                >&nbsp;*</small
                                            >
                                            <textarea
                                                id="subjects"
                                                name="subjects"
                                                class="form-control form-control-lg"
                                                placeholder="Enter subjects"
                                                bind:value={val.subjects}
                                            ></textarea>
                                            {#if form?.errors?.subjects}<small
                                                    class="text-danger"
                                                    >{form.errors
                                                        .subjects}</small
                                                >{/if}
                                        </div>
                                    {/if}

                                    <!-- Teaching Preference -->
                                    <div class="col-12 mt-3">
                                        <label
                                            class="form-label"
                                            for="teachingPreference"
                                            >Teaching Preference</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <select
                                            class="form-select"
                                            name="teachingPreference"
                                            id="teachingPreference"
                                            bind:value={val.teachingPreference}
                                            required
                                        >
                                            <option value="" disabled
                                                >choose preference</option
                                            >
                                            <option value="in_person"
                                                >In Person</option
                                            >
                                            <option value="online"
                                                >Online</option
                                            >
                                            <option value="hybrid"
                                                >Hybrid</option
                                            >
                                        </select>
                                        {#if form?.errors?.teachingPreference}<small
                                                class="text-danger"
                                                >{form.errors
                                                    .teachingPreference}</small
                                            >{/if}
                                    </div>

                                    <!-- Qualifications -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label"
                                            >Qualifications</label
                                        >
                                        <small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <div>
                                            {#each val.qualifications as qual, idx (idx)}
                                                <div
                                                    class="card mb-3 p-3 text-white"
                                                >
                                                    <div
                                                        class="row g-2 align-items-end"
                                                    >
                                                        <div class="col-md-4">
                                                            <label
                                                                class="form-label"
                                                                >Name of Degree/
                                                                Diploma</label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="e.g. (BA/ Hon/ MSc/ PGCE)"
                                                                name={`qualifications[${idx}].title`}
                                                                bind:value={
                                                                    qual.title
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label
                                                                class="form-label"
                                                                >Academic
                                                                Institution</label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                name={`qualifications[${idx}].organisation`}
                                                                bind:value={
                                                                    qual.organisation
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-3">
                                                            <label
                                                                class="form-label"
                                                                >NQF Level</label
                                                            >
                                                            <select
                                                                class="form-select"
                                                                name={`qualifications[${idx}].nqf`}
                                                                bind:value={
                                                                    qual.nqf
                                                                }
                                                                required
                                                            >
                                                                <option
                                                                    value=""
                                                                    disabled
                                                                    >Select</option
                                                                >
                                                                <option
                                                                    value="4"
                                                                    >NSC/Matric
                                                                    (NQF 4)</option
                                                                >
                                                                <option
                                                                    value="6"
                                                                    >Honours/PGCE
                                                                    (NQF 6)</option
                                                                >
                                                                <option
                                                                    value="7"
                                                                    >Masters/Bachelors
                                                                    (NQF 7)</option
                                                                >
                                                                <option
                                                                    value="8"
                                                                    >Doctorate
                                                                    (NQF 8)</option
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
                                                                    onclick={() =>
                                                                        removeQualification(
                                                                            idx,
                                                                        )}
                                                                    >remove</button
                                                                >
                                                            {/if}
                                                        </div>
                                                        <div
                                                            class="col-md-3 mt-2"
                                                        >
                                                            <label
                                                                class="form-label"
                                                                >From</label
                                                            >
                                                            <input
                                                                type="date"
                                                                class="form-control"
                                                                name={`qualifications[${idx}].from`}
                                                                bind:value={
                                                                    qual.from
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div
                                                            class="col-md-3 mt-2"
                                                        >
                                                            {#if !qual.ongoing}
                                                                <label
                                                                    class="form-label"
                                                                    >To</label
                                                                >
                                                                <input
                                                                    type="date"
                                                                    class="form-control"
                                                                    name={`qualifications[${idx}].to`}
                                                                    bind:value={
                                                                        qual.to
                                                                    }
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
                                                                bind:checked={
                                                                    qual.ongoing
                                                                }
                                                                id={`ongoing-${idx}`}
                                                                class="form-check-input p-1"
                                                            />
                                                            <label
                                                                for={`ongoing-${idx}`}
                                                                class="ms-2"
                                                                >Ongoing</label
                                                            >
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                            <button
                                                type="button"
                                                class="btn btn-outline-light btn-sm p-1 mt-2"
                                                onclick={addQualification}
                                                >+ Add Qualification</button
                                            >
                                        </div>
                                        {#if form?.errors?.qualifications}<small
                                                class="text-danger"
                                                >{form.errors
                                                    .qualifications}</small
                                            >{/if}
                                    </div>
                                    <!-- References -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label"
                                            >References</label
                                        >
                                        <small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <div>
                                            {#each val.references as ref, idx (idx)}
                                                <div
                                                    class="card mb-3 p-3 text-white"
                                                >
                                                    <div
                                                        class="row g-2 align-items-end"
                                                    >
                                                        <div class="col-md-4">
                                                            <label
                                                                class="form-label"
                                                                >Name</label
                                                            >
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                name={`references[${idx}].name`}
                                                                bind:value={
                                                                    ref.name
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label
                                                                class="form-label"
                                                                >Email</label
                                                            >
                                                            <input
                                                                type="email"
                                                                class="form-control"
                                                                name={`references[${idx}].email`}
                                                                bind:value={
                                                                    ref.email
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div class="col-md-4">
                                                            <label
                                                                class="form-label"
                                                                >Phone
                                                                (Optional)</label
                                                            >
                                                            <input
                                                                type="tel"
                                                                class="form-control"
                                                                name={`references[${idx}].phone`}
                                                                bind:value={
                                                                    ref.phone
                                                                }
                                                            />
                                                        </div>
                                                        <div
                                                            class="col-md-12 mt-2"
                                                        >
                                                            <label
                                                                class="form-label"
                                                                >Reference</label
                                                            >
                                                            <label
                                                                class="form-label"
                                                                >Professional
                                                                relationship</label
                                                            >
                                                            <input
                                                                class="form-control"
                                                                name={`references[${idx}].reference`}
                                                                bind:value={
                                                                    ref.reference
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div
                                                            class="col-md-2 mt-2 d-flex align-items-center justify-content-end"
                                                        >
                                                            {#if val.references.length > 1}
                                                                <button
                                                                    type="button"
                                                                    class="btn btn-danger btn-sm ms-2"
                                                                    onclick={() =>
                                                                        removeReference(
                                                                            idx,
                                                                        )}
                                                                    >remove</button
                                                                >
                                                            {/if}
                                                        </div>
                                                    </div>
                                                </div>
                                            {/each}
                                            <button
                                                type="button"
                                                class="btn btn-outline-light btn-sm p-1 mt-2"
                                                onclick={addReference}
                                                >+ Add Reference</button
                                            >
                                        </div>
                                        {#if form?.errors?.references}<small
                                                class="text-danger"
                                                >{form.errors.references}</small
                                            >{/if}
                                    </div>

                                    <!-- Languages -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label"
                                            >Language Proficiency</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label class="form-label"
                                                    >Home Language</label
                                                >
                                                <select
                                                    class="form-select"
                                                    name="languages.motherTongue"
                                                    bind:value={
                                                        val.languages
                                                            .motherTongue
                                                    }
                                                    required
                                                >
                                                    <option value=""
                                                        >Select mother tongue</option
                                                    >
                                                    {#each languages as lang}
                                                        <option
                                                            value={lang.code}
                                                            >{lang.name}</option
                                                        >
                                                    {/each}
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label class="form-label"
                                                    >Additional Languages</label
                                                >
                                                <div
                                                    class="additional-languages-container"
                                                >
                                                    {#each languages as lang}
                                                        {#if lang.code !== val.languages.motherTongue}
                                                            <div
                                                                class="form-check language-option"
                                                            >
                                                                <label
                                                                    class="form-check-label"
                                                                    for={`lang-${lang.code}`}
                                                                >
                                                                    {lang.name}
                                                                </label>
                                                                <input
                                                                    class="form-check-input"
                                                                    type="checkbox"
                                                                    name={`languages.additional`}
                                                                    id={`lang-${lang.code}`}
                                                                    value={lang.code}
                                                                    checked={val.languages.additional.includes(
                                                                        lang.code,
                                                                    )}
                                                                    onchange={(
                                                                        e,
                                                                    ) => {
                                                                        if (
                                                                            e
                                                                                .target
                                                                                .checked
                                                                        ) {
                                                                            val.languages.additional =
                                                                                [
                                                                                    ...val
                                                                                        .languages
                                                                                        .additional,
                                                                                    lang.code,
                                                                                ];
                                                                        } else {
                                                                            val.languages.additional =
                                                                                val.languages.additional.filter(
                                                                                    (
                                                                                        code,
                                                                                    ) =>
                                                                                        code !==
                                                                                        lang.code,
                                                                                );
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        {/if}
                                                    {/each}
                                                </div>
                                                <small
                                                    class="text-muted mt-2 d-block"
                                                >
                                                    Selected: {val.languages
                                                        .additional.length} additional
                                                    {val.languages.additional
                                                        .length === 1
                                                        ? "language"
                                                        : "languages"}
                                                </small>
                                            </div>
                                        </div>
                                        {#if form?.errors?.languages}<small
                                                class="text-danger"
                                                >{typeof form.errors
                                                    .languages === "string"
                                                    ? form.errors.languages
                                                    : "Error in languages"}</small
                                            >{/if}
                                    </div>

                                    <!-- Address Fields: -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="street"
                                            >Street Address</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
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
                                                >{form.errors[
                                                    "address.street"
                                                ]}</small
                                            >{/if}
                                    </div>
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="city"
                                            >City</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
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
                                                >{form.errors[
                                                    "address.city"
                                                ]}</small
                                            >{/if}
                                    </div>
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label
                                            class="form-label"
                                            for="addressProvince"
                                            >Province</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <select
                                            class="form-select"
                                            name="address.province"
                                            id="addressProvince"
                                            bind:value={val.address.province}
                                            required
                                        >
                                            <option value="" disabled
                                                >choose province</option
                                            >
                                            <option value="gauteng"
                                                >Gauteng</option
                                            >
                                            <option value="free_state"
                                                >Free State</option
                                            >
                                            <option value="western_cape"
                                                >Western Cape</option
                                            >
                                            <option value="north_west"
                                                >North West</option
                                            >
                                            <option value="northern_cape"
                                                >Northern Cape</option
                                            >
                                            <option value="limpopo"
                                                >Limpopo</option
                                            >
                                            <option value="kwazulu_natal"
                                                >KwaZulu-Natal</option
                                            >
                                            <option value="mpumalanga"
                                                >Mpumalanga</option
                                            >
                                            <option value="eastern_cape"
                                                >Eastern Cape</option
                                            >
                                        </select>
                                        {#if form?.errors?.["address.province"]}<small
                                                class="text-danger"
                                                >{form.errors[
                                                    "address.province"
                                                ]}</small
                                            >{/if}
                                    </div>
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label
                                            class="form-label"
                                            for="postalCode">Postal Code</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
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
                                                >{form.errors[
                                                    "address.postalCode"
                                                ]}</small
                                            >{/if}
                                    </div>

                                    <!-- Cell Number -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label" for="cell"
                                            >Cell Number</label
                                        ><small class="text-danger"
                                            >&nbsp;*</small
                                        >
                                        <input
                                            type="tel"
                                            name="cell"
                                            id="cell"
                                            class="form-control form-control-lg"
                                            placeholder="Cell number"
                                            bind:value={val.cell}
                                            required
                                        />
                                        {#if cellErr && val.cell}<small
                                                class="text-warning"
                                                >{cellErr}</small
                                            >{/if}
                                        {#if form?.errors?.cell}<small
                                                class="text-danger"
                                                >{form.errors.cell}</small
                                            >{/if}
                                    </div>
                                </div>

                                {#if loadingForm}
                                    <div
                                        class="d-flex justify-content-center mt-5 mb-5"
                                    >
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
                                        disabled={loadingForm || cellErr}
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
