<script>
    import axios from "axios";
    import { goto } from "$app/navigation";
    import { API_URL, toastSuc, toastErr } from "$lib/env.js";
    import { id } from "$lib/stores";
    import { Jumper } from "svelte-loading-spinners";
    import { object, string, boolean, number } from "yup";
    import { toast } from "@zerodevx/svelte-toast";
    import { onMount } from "svelte";

    // Cell phone validation regex
    let cellRegex = new RegExp("^(\\+27|0|27)(1|6|7|8|9)([0-9]{8})$", "g");

    // Profile schema definition
    let profileSchema = object({
        // Schema remains the same as in the original code
        firstName: string().required(),
        lastName: string().required(),
        cell: string().matches(cellRegex, "Phone number is not valid").required(),
        sace: string().test(
            "conditional-sace-requirement",
            "SACE number is required (7 digits)",
            function (sace) {
                const { idNumber } = this.parent;

                // If ID is valid, SACE is optional
                if (idNumber && idNumber.length === 13) {
                    return true;
                }

                // Otherwise, SACE must be valid
                return sace && sace.length === 7;
            }
        ),
        terms: boolean().required().isTrue(),
        idNumber: string().test(
            "conditional-id-requirement",
            "ID Number is required (13 digits)",
            function (idNumber) {
                const { sace } = this.parent;

                // If SACE is valid, ID is optional
                if (sace && sace.length === 7) {
                    return true;
                }

                // Otherwise, ID must be valid
                return idNumber && idNumber.length === 13;
            }
        ),
        teachingPhases: object({
            earlyLearning: boolean().required(),
            foundation: boolean().required(),
            intermediate: boolean().required(),
            get: boolean().required(),
            fet: boolean().required(),
        }),
        subjects: string().when("teachingPhases", {
            is: (val) => val.get || val.fet,
            then: () => string().required("At least one subject/learning area is required"),
            otherwise: () => string().nullable(),
        }),
        experience: number().integer().required(),
        position: object({
            intern: boolean().required(),
            locum: boolean().required(),
            full_time: boolean().required(),
            tutor: boolean().required(),
            mentor: boolean().required(),
        }),
        address: object({
            street: string().required(),
            city: string().required(),
            postalCode: string().required(),
            province: string()
                .oneOf([
                    "gauteng",
                    "free_state",
                    "western_cape",
                    "north_west",
                    "northern_cape",
                    "limpopo",
                    "kwazulu_natal",
                    "mpumalanga",
                    "eastern_cape",
                ])
                .required(),
        }).required(),
        teachingPreference: string()
            .oneOf(["in_person", "online", "hybrid"], "Invalid preference")
            .required("Preference is required"),
        qualifications: string().required("Qualification is required"),
        references: string().required("Reference is required"),
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
        }),
    });

    let cellErr = null;
    $: profileSchema
        .validateAt("cell", val)
        .then(() => {
            cellErr = null;
        })
        .catch((err) => {
            cellErr = err.message;
        });

    // Form data
    let val = {
        looking: true,
        teachingPhases: {
            earlyLearning: false,
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
        },
    };

    // Flag to track if profile exists
    let profileExists = false;

    // Status flags
    let loading = false;
    let errorMsg = null;
    let regError = false;
    let email = "";

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

    // Function to fetch user profile
    async function fetchUserProfile() {
        loading = true;
        try {
            const response = await axios.get(
                `${API_URL}/users/me?populate[profile][populate]=address,teachingPhases`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt"),
                    },
                }
            );

            // Check if user has a profile
            if (response.data && response.data.profile) {
                profileExists = true;

                // Populate form with existing data
                const profile = response.data.profile;

                // Update form values with existing profile data
                val = {
                    firstName: profile.firstName || "",
                    lastName: profile.lastName || "",
                    cell: profile.cell || "",
                    sace: profile.sace || "",
                    idNumber: profile.idNumber || "",
                    looking: profile.looking !== undefined ? profile.looking : true,
                    teachingPhases: profile.teachingPhases || val.teachingPhases,
                    subjects: profile.subjects || "",
                    experience: profile.experience || 0,
                    position: profile.position || val.position,
                    address: profile.address || val.address,
                    teachingPreference: profile.teachingPreference || "",
                    qualifications: profile.qualifications || "",
                    references: profile.references || "",
                    languages: profile.languages || val.languages,
                    terms: true, // Assume terms already accepted if profile exists
                };

                console.log("Existing profile loaded:", profile);
            } else {
                console.log("No existing profile found, will create new one");
                profileExists = false;
            }
        } catch (error) {
            console.log("Error fetching user profile:", error);
            toast.push(
                "Error loading profile: " + (error.response?.data?.error?.message || error.message),
                toastErr
            );
        } finally {
            loading = false;
        }
    }

    // Function to save profile (handles both create and update)
    async function saveProfile() {
        if (!profileSchema.isValidSync(val)) {
            toast.push("Please fix form errors before submitting", toastErr);
            return;
        }

        loading = true;

        const profileData = {
            firstName: val.firstName,
            lastName: val.lastName,
            cell: val.cell,
            sace: val.sace,
            ttCode: ttCode,
            looking: val.looking,
            idNumber: val.idNumber,
            teachingPhases: val.teachingPhases,
            subjects: val.subjects,
            experience: val.experience,
            position: val.position,
            address: val.address,
            teachingPreference: val.teachingPreference,
            qualifications: val.qualifications,
            references: val.references,
            languages: val.languages,
        };

        try {
            let response;

            if (profileExists) {
                // Update existing profile
                response = await axios.put(
                    `${API_URL}/profiles/2`,
                    {
                        data: {
                            ...profileData,
                        },
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt"),
                        },
                    }
                );
                console.log("Profile updated:", response.data);
            } else {
                // Create new profile
                response = await axios.post(
                    `${API_URL}/profiles`,
                    {
                        data: {
                            ...profileData,
                            user: $id, // Link to user
                        },
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt"),
                        },
                    }
                );
                console.log("Profile created:", response.data);
            }

            // Success handling
            toast.push(`Profile ${profileExists ? "updated" : "created"} successfully!`, toastSuc);
            email = response.data.email;

            // Clear local storage and redirect
            localStorage.clear();
            sessionStorage.clear();
            goto("/benefits");
        } catch (error) {
            console.log("An error occurred:", error.response);
            toast.push(error.response?.data?.error?.message || "Error saving profile", toastErr);
            regError = true;
        } finally {
            loading = false;
        }
    }

    // Load profile data when component mounts
    onMount(() => {
        fetchUserProfile();
    });
</script>

<svelte:head>
    <title>Create Profile | ThinkTeacher</title>
    <meta name="description" content="Create profile for ThinkTeacher!" />
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

                            <form id="register">
                                <div class="row">
                                    <div class="col-sm-12 col-md-6">
                                        <label class="form-label" for="name">First Name</label
                                        ><small class="text-danger">&nbsp;*</small>
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
                                        <label class="form-label" for="surname">Surname</label
                                        ><small class="text-danger">&nbsp;*</small>
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
                                            required
                                        />
                                    </div>

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
                                            bind:value={val.sace}
                                        />
                                    </div>

                                    <!-- TODO: activley looking togle yes/no -->
                                    <div class="form-check form-switch mt-3">
                                        <label class="form-check-label" for="flexSwitchCheckDefault"
                                            >Actively Looking?</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            style="width: 3rem; height: 1.2rem;"
                                            bind:checked={val.looking}
                                            class="form-check-input"
                                            type="checkbox"
                                            id="flexSwitchCheckDefault"
                                        />
                                    </div>

                                    <!-- Position - New field -->
                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label"
                                            >Position you are interested in:</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
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
                                                bind:checked={val.position.mentor}
                                                id="mentor"
                                            />
                                            <label class="form-check-label" for="mentor"
                                                >Mentor</label
                                            >
                                        </div>
                                    </div>

                                    <div class="col-sm-12 col-md-6 mt-3">
                                        <label class="form-label">Education Phase</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
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
                                                bind:checked={val.teachingPhases.get}
                                                id="get"
                                            />
                                            <label class="form-check-label" for="get"
                                                >GET (General Education and Training)</label
                                            >
                                        </div>
                                        <div class="form-check text-start ms-4">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                bind:checked={val.teachingPhases.fet}
                                                id="fet"
                                            />
                                            <label class="form-check-label" for="fet"
                                                >FET (Further Education and Training)</label
                                            >
                                        </div>
                                    </div>

                                    <!-- Subjects - New field (conditional) -->
                                    {#if val.teachingPhases.get || val.teachingPhases.fet}
                                        <div class="col-12 mt-3">
                                            <label class="form-label" for="subjects"
                                                >Subjects/Learning Areas</label
                                            ><small class="text-danger">&nbsp;*</small>
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
                                        <label class="form-label" for="experience"
                                            >Years of Experience</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <input
                                            type="number"
                                            name="experience"
                                            id="experience"
                                            class="form-control form-control-lg"
                                            placeholder="Years of experience"
                                            bind:value={val.experience}
                                            min="0"
                                            max="60"
                                            required
                                        />
                                    </div>

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
                                            min="0"
                                            max="9999999999999"
                                            required
                                        />
                                        {#if cellErr && val.cell && val.cell != ""}
                                            <small class="text-error">{cellErr}</small>
                                        {/if}
                                    </div>

                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="street">Street Address</label
                                        ><small class="text-danger">&nbsp;*</small>
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
                                        <label class="form-label" for="city">City</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
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
                                        <label class="form-label" for="addressProvince"
                                            >Province</label
                                        ><small class="text-danger">&nbsp;*</small>
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
                                        <label class="form-label" for="postalCode"
                                            >Postal Code</label
                                        ><small class="text-danger">&nbsp;*</small>
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

                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="teachingPreference"
                                            >Teaching Preference</label
                                        ><small class="text-danger">&nbsp;*</small>
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

                                    <!-- Qualifications - New field -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="qualifications"
                                            >Qualification/s (Date awarded or predicted finishing
                                            date; Name of institution)</label
                                        ><small class="text-danger">&nbsp;*</small>
                                        <textarea
                                            id="qualifications"
                                            class="form-control form-control-lg"
                                            placeholder="List your qualifications"
                                            bind:value={val.qualifications}
                                            required
                                        ></textarea>
                                    </div>

                                    <!-- References - New field -->
                                    <div class="col-12 mt-3">
                                        <label class="form-label" for="references"
                                            >References (Name of person; position they hold; contact
                                            number) Please give three.</label
                                        ><small class="text-danger">&nbsp;*</small>
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
                                        <label class="form-label">Language Proficiency</label><small
                                            class="text-danger">&nbsp;*</small
                                        >
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-check text-start ms-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
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
                                                        bind:checked={val.languages.isi_ndebele}
                                                        id="isiNdebele"
                                                    />
                                                    <label class="form-check-label" for="isiNdebele"
                                                        >isiNdebele</label
                                                    >
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        bind:checked={val.languages.isi_xhosa}
                                                        id="isiXhosa"
                                                    />
                                                    <label class="form-check-label" for="isiXhosa"
                                                        >isiXhosa</label
                                                    >
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        bind:checked={val.languages.isi_zulu}
                                                        id="isiZulu"
                                                    />
                                                    <label class="form-check-label" for="isiZulu"
                                                        >isiZulu</label
                                                    >
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
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
                                                        bind:checked={val.languages.si_swati}
                                                        id="siSwati"
                                                    />
                                                    <label class="form-check-label" for="siSwati"
                                                        >siSwati</label
                                                    >
                                                </div>
                                                <div class="form-check text-start ms-4">
                                                    <input
                                                        class="form-check-input"
                                                        type="checkbox"
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
                                                        bind:checked={val.languages.xitsonga}
                                                        id="xitsonga"
                                                    />
                                                    <label class="form-check-label" for="xitsonga"
                                                        >Xitsonga</label
                                                    >
                                                </div>
                                            </div>
                                        </div>
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
                                        {#if !val.terms}
                                            <small class="text-danger"
                                                >Please accept the terms and conditions above</small
                                            >
                                        {/if}
                                    </div>
                                </div>

                                {#if loading}
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
                                        on:click|preventDefault={saveProfile}
                                        disabled={!profileSchema.isValidSync(val)}>Submit</button
                                    >
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

    /* Additional styling for the new form fields */
    .text-error {
        color: #f8d7da;
    }

    .form-check.text-start .form-check-input {
        float: left;
        margin-left: -1.5em;
    }
</style>
