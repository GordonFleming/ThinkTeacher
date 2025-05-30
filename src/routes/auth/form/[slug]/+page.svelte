<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { Jumper } from "svelte-loading-spinners";
    import { API_URL, toastErr, toastSuc } from "$lib/env.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { benType } from "$lib/stores";

    let loading = $state(true);

    const { data } = $props();
    const { type, user } = data;
    let formOpt = type.form_extra;

    let message = $state("");
    let custom = $state({});
    let header = $state({});
    let obj = $state({});
    let userObj = $state({});
    let typeName = $state(type.name.replace("_", " "));

    onMount(async () => {
        if (formOpt.hasOwnProperty(type.name)) {
            custom = formOpt[type.name];
            Object.assign(obj, custom);
            Object.keys(obj).forEach((key) => {
                if (Array.isArray(obj[key])) {
                    obj[key] = obj[key][0];
                }
            });
        } else {
            goto("/404");
        }

        loading = false;

        userObj = {
            fullname: user.firstName + " " + user.lastName,
            email: user.email,
            ttNum: user.ttCode,
        };

        if (Object.hasOwn(custom, "for_myself")) {
            obj.education_phase = user.eduPhase.replace("_", " ");
            if (user.workplace) {
                obj.workplace = user.workplace;
            }
            if (user.province !== "none") {
                obj.province = user.province.replace("_", " ");
            }
        }
        if (Object.hasOwn(custom, "field_of_interest")) {
            obj.field_of_interest = $benType;
        }
        if (Object.hasOwn(custom, "type_of_holiday")) {
            obj.type_of_holiday = $benType;
        }
    });

    async function submitForm() {
        loading = true;
        await axios
            .post(
                `${API_URL}/partner-forms`,
                {
                    data: {
                        custom: obj,
                        message: message,
                        partner_email: type.partner_email,
                        users_permissions_user: user.id,
                    },
                },
                header
            )
            .then((response) => {
                toast.push("Message sent!", toastSuc);
                console.log(response);
                loading = false;
            })
            .catch((error) => {
                console.log("An error occurred:", error);
                toast.push("Something went wrong", toastErr);
            });
    }
    // $: console.log(obj);
</script>

<svelte:head>
    <title>Contact {typeName} | ThinkTeacher</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5 mb-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1.4s" />
    </div>
{:else}
    <h2 class="fw-bold mb-2 text-uppercase">Contact Partner</h2>

    <form id="contactPartner">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <label class="form-label" for="name">Name</label>
                <input
                    type="text"
                    name="fullname"
                    id="name"
                    class="form-control form-control-lg"
                    bind:value={userObj.fullname}
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
                    bind:value={userObj.email}
                    readonly
                    required
                />
            </div>
            <div class="col-12 mt-2">
                <label class="form-label" for="ttNum">ThinkTeacher Number</label>
                <input
                    type="text"
                    name="ttNumber"
                    id="ttNum"
                    class="form-control form-control-lg"
                    bind:value={userObj.ttNum}
                    readonly
                    required
                />
            </div>

            <!-- Custom section -->
            {#each Object.entries(custom) as [key, value]}
                {#if typeof value == "string" && value == ""}
                    <div class="col-12 mt-2">
                        <label class="form-label text-capitalize" for={key}
                            >{key.replaceAll("_", " ")}</label
                        >
                        <input
                            type="text"
                            name={key}
                            id={key}
                            class="form-control form-control-lg"
                            bind:value={obj[key]}
                            required
                        />
                    </div>
                {/if}
                {#if value == "date"}
                    <div class="col-12 mt-2">
                        <label class="form-label text-capitalize" for={key}
                            >{key.replaceAll("_", " ")}</label
                        >
                        <input
                            type="date"
                            name={key}
                            id={key}
                            class="form-control form-control-lg"
                            bind:value={obj[key]}
                            required
                        />
                    </div>
                {/if}
                {#if typeof value == "number"}
                    <div class="col-12 mt-2">
                        <label class="form-label text-capitalize" for={key}
                            >{key.replaceAll("_", " ")}</label
                        >
                        <input
                            type="number"
                            name={key}
                            id={key}
                            class="form-control form-control-lg"
                            placeholder="0"
                            bind:value={obj[key]}
                            min="0"
                            max="100"
                        />
                    </div>
                {/if}
                {#if typeof value == "boolean"}
                    <div class="col-sm-12 col-md-6 mt-2">
                        <label
                            class="form-label form-check-label text-capitalize"
                            for={key.replaceAll("_", " ")}>{key.replaceAll("_", " ")}?</label
                        >
                        <div class="form-switch justify-content-center d-flex mt-1">
                            <input
                                class="form-check-input form-control"
                                type="checkbox"
                                role="switch"
                                id={key}
                                bind:checked={obj[key]}
                            />
                        </div>
                    </div>
                {/if}
                {#if Array.isArray(value)}
                    <div class="col-12 mt-2">
                        <label class="form-label text-capitalize" for={key}
                            >{key.replaceAll("_", " ")}?</label
                        >
                        <select class="form-select" id={key} bind:value={obj[key]} required>
                            {#each value as val}
                                <option class="text-capitalize" value={val}
                                    >{val.replaceAll("_", " ")}</option
                                >
                            {/each}
                        </select>
                    </div>
                {/if}
                {#if key == "extraFileInfo"}
                    <div class="row mt-3">
                        <p class="fw-bold">Read more:</p>
                        {#each value.files as val}
                            <div class="col">
                                <p>{val.name}</p>
                                <a href={val.url} target="_blank" rel="noreferrer">
                                    <img class="mb-2" src="/pdf-icon.svg" alt="pdf" />
                                </a>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if key == "extraNourishInfo"}
                    <div class="row mt-3">
                        <h4 class="text-logo-gold">
                            Promo's are valid now from 1st March 2023 - 2nd June 2023!
                        </h4>
                        <p class="fw-bold">Read more:</p>
                        {#each value.files as val}
                            <div class="col">
                                <p>{val.name}</p>
                                <a href={val.url} target="_blank" rel="noreferrer">
                                    <img class="mb-2" src="/pdf-icon.svg" alt="pdf" />
                                </a>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if key == "extraJobInfo"}
                    <div class="row mt-3">
                        <h4 class="text-logo-gold">View the vacancy below:</h4>
                        <p class="fw-bold">Read more:</p>
                        {#each value.files as val}
                            <div class="col">
                                <p>{val.name}</p>
                                <a href={val.url} target="_blank" rel="noreferrer">
                                    <img class="mb-2" src="/pdf-icon.svg" alt="pdf" />
                                </a>
                            </div>
                        {/each}
                    </div>
                {/if}
            {/each}

            <div class="col-12 mt-2">
                <label class="form-label" for="message">Message</label>
                <textarea
                    type="text"
                    name="message"
                    id="message"
                    placeholder="enter your enquiry here..."
                    class="form-control form-control-lg"
                    bind:value={message}
                    required
                ></textarea>
            </div>
        </div>
        <button class="btn btn-outline-light btn-lg px-4 mt-4" type="submit" onclick={submitForm}
            >Submit</button
        >
    </form>
{/if}

<style>
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
