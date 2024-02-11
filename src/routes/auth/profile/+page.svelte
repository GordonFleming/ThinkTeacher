<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { Jumper } from "svelte-loading-spinners";
    import { API_URL, sendgridList, sgKey, toastSuc, toastErr } from "$lib/env.js";
    import { toast } from "@zerodevx/svelte-toast";

    let loading = true;

    let email, id;
    let altMail,
        cell,
        eduPhase,
        qualification,
        sace,
        workplace,
        province,
        firstName,
        lastName,
        ttCode;
    const res =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    onMount(async () => {
        const res = await axios
            .get(`${API_URL}/users/me`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .catch(function (error) {
                console.log("Error", error.message);
                //goto("/login");
            });
        user = res.data;
        loading = false;
        firstName = user.firstName;
        lastName = user.last_name;
        ttCode = user.ttCode;
        email = user.email;
        eduPhase = user.eduPhase;
        sace = user.sace;
        cell = user.cell;
        altMail = user.altMail;
        qualification = user.qualification;
        workplace = user.workplace;
        province = user.province;
        id = user.id;
    });

    async function updateUser() {
        if (eduPhase == "none" || !res.test(String(email).toLowerCase())) {
            toast.push("Email not valid or Education phase not selected!", toastErr);
        } else {
            loading = true;

            if (!altMail) altMail = "null@null.com";
            if (!province) province = "NA";

            await axios
                .put(
                    "https://sendgrid.com/v3/marketing/contacts",
                    {
                        list_ids: [sendgridList],
                        contacts: [
                            {
                                email: email,
                                alternate_emails: [altMail],
                                first_name: firstName,
                                last_name: lastName,
                                state_province_region: province,
                                phone_number: cell,
                                custom_fields: { e1_T: ttCode },
                            },
                        ],
                    },
                    { headers: { Authorization: `Bearer ${sgKey}` } }
                )
                .then((response) => {
                    console.log("SG reponse: ", response.statusText, " ", response.data);
                    loading = false;
                })
                .catch((error) => {
                    console.error(error);
                });

            await axios
                .put(
                    `${API_URL}/users/${id}`,
                    {
                        username: email,
                        email: email,
                        qualification: qualification,
                        cell: cell,
                        eduPhase: eduPhase,
                        sace: String(sace),
                        workplace: workplace,
                        province: province,
                        altMail: altMail,
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt"),
                        },
                    }
                )
                .then((response) => {
                    toast.push("Update successful!", toastSuc);
                    loading = false;
                    console.log(response);
                })
                .catch((error) => {
                    console.error("eee", error.response.data.error.message.replace(".", " "));
                    toast.push(error.response.data.error.message.replace(".", " "), toastErr);
                });
        }
    }

    let user;
</script>

<svelte:head>
    <title>Profile | ThinkTeacher</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5 mb-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1.4s" />
    </div>
{:else}
    <section class="vh-50 gradient-custom container mt-4 mb-4">
        <h3>
            Hi, <strong>{firstName}</strong> here you will be able to update your personal details.
        </h3>
        <h4>
            Your ThinkTeacher Number: <span class="text-logo-gold">{user.ttCode}</span>
        </h4>
        <div class="py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                    <form id="update">
                        <div class="card bg-dark text-white" style="border-radius: 1rem;">
                            <div class="card-body p-md-3 p-lg-4 text-center">
                                <div class="mb-md-3 mt-md-2">
                                    <div class="form-outline form-white mb-2">
                                        <label class="form-label" for="Email">Email</label>
                                        <input
                                            type="email"
                                            id="Email"
                                            class="form-control form-control-lg"
                                            value={user.email}
                                            readonly
                                            required
                                        />
                                        <small class="text-danger">To update your email, <a href="/contact-us">contact us</a></small>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 mt-2">
                                            <label class="form-label" for="qual"
                                                >Qualification</label
                                            ><small class="text-danger">
                                                <input
                                                    type="text"
                                                    name="qual"
                                                    id="qual"
                                                    class="form-control form-control-lg"
                                                    placeholder="Qualification"
                                                    bind:value={qualification}
                                                />
                                            </small>
                                        </div>
                                        <div class="col-12 mt-2">
                                            <label class="form-label" for="eduPhase"
                                                >Education Phase</label
                                            >
                                            <select
                                                class="form-select"
                                                id="eduPhase"
                                                aria-label="Education Phase"
                                                bind:value={eduPhase}
                                                required
                                            >
                                                <option value="none" selected>choose phase</option>
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
                                        <div class="col-sm-12 col-md-6 mt-2">
                                            <label class="form-label" for="sace">SACE Number</label
                                            ><small class="text-danger">
                                                <input
                                                    type="number"
                                                    name="sace"
                                                    id="sace"
                                                    class="form-control form-control-lg"
                                                    placeholder="SACE number"
                                                    bind:value={sace}
                                                    min="0"
                                                    max="999999999"
                                                />
                                            </small>
                                        </div>
                                        <div class="col-sm-12 col-md-6 mt-2">
                                            <label class="form-label" for="cell">Cell Number</label>
                                            <input
                                                type="tel"
                                                name="cell"
                                                id="cell"
                                                class="form-control form-control-lg"
                                                placeholder="Cell number"
                                                bind:value={cell}
                                                min="0"
                                                max="9999999999999"
                                                required
                                            />
                                        </div>
                                        <div class="col-12 mt-2">
                                            <label class="form-label" for="altEmail"
                                                >Alternative Email</label
                                            ><small class="text-danger">
                                                <input
                                                    type="email"
                                                    id="altEmail"
                                                    class="form-control form-control-lg"
                                                    placeholder="alternative email"
                                                    bind:value={altMail}
                                                />
                                            </small>
                                        </div>
                                        <div class="col-12 mt-2">
                                            <label class="form-label" for="school"
                                                >School / Institution</label
                                            ><small class="text-danger">
                                                <input
                                                    type="text"
                                                    name="school"
                                                    id="school"
                                                    class="form-control form-control-lg"
                                                    placeholder="school or institution"
                                                    bind:value={workplace}
                                                />
                                            </small>
                                        </div>
                                        <div class="col-12 mt-2">
                                            <label class="form-label" for="province">Province</label
                                            ><small class="text-danger">
                                                <select
                                                    class="form-select"
                                                    id="province"
                                                    aria-label="Province"
                                                    bind:value={province}
                                                >
                                                    <option value="none" selected
                                                        >choose province</option
                                                    >
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
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    class="btn btn-outline-light btn-lg px-4 mt-2"
                                    type="submit"
                                    disabled={province == "none"}
                                    on:click|preventDefault={updateUser}>Update</button
                                >
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
</style>
