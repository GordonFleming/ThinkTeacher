<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'
    import {travelType} from '$lib/stores'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let loading = true, buttonSubmit = true
    $: if(typeHoliday !== ''){ buttonSubmit = false }

    let fullname, email, ttNum, user

    onMount(async() =>{
        const res = await axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt"),
            },
        }).catch(function (error) {
            console.log('Error', error.message);
            goto("/login")
        });
        user = res.data

        loading = false
        fullname= user.firstName +" "+ user.lastName
        email=user.email
        ttNum=user.ttCode
    })

    let startDate, endDate, typeHoliday = $travelType, reason, where, nationality=true, numChild, numAdult, budget, partnerEmail="u20447613@tuks.co.za" //gdoig@mweb.co.za

    async function submitForm(){
        await axios
            .post(`${API_URL}/partner-forms/custom`, {
                fullName: fullname,
                ttNumber: ttNum,
                email: email,
                custom: [{
                    __component: "custom-form.travel-date",
                    startDate: startDate,
                    endDate: endDate,
                    typeHoliday: typeHoliday,
                    reason: reason,
                    where: where,
                    numChildren: numChild,
                    numAdults: numAdult,
                    nationality: nationality,
                    budget: budget,
                }],
                partnerEmail: partnerEmail,
            })
            .then(response => {
                console.log('Form values: ', response.data)
                msg = fullname + ", you have successfully made contact with ThinkTeacher's partner. The partner will be in touch with you soon."
                document.getElementById("contactPartner").reset()
            })
            .catch(error => {
                console.log('An error occurred:', error.response.data)
                errorMsg = error.response.data.message[0].messages[0].message
            })
    }

    let msg, errorMsg
</script>

<svelte:head>
	<title>Contact Partner</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
    </div>
{:else}
    <section class="vh-50 gradient-custom container mt-4 mb-4">
        <div class="py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-3 p-lg-4 text-center">
                    <div class="mb-md-3 mt-md-2">
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
                                    <input type="text" name="fullname" id="name" class="form-control form-control-lg" bind:value={fullname} readonly required />
                                </div>
                                <div class="col-md-12 mt-2">
                                    <label class="form-label" for="surname">Email</label>
                                    <input type="text" name="surname" id="surname" class="form-control form-control-lg" bind:value={email} readonly required />
                                </div>
                                <div class="col-12 mt-2">
                                    <label class="form-label" for="idNum">ThinkTeacher Number</label>
                                    <input type="text" name="idNumber" id="idNum" class="form-control form-control-lg" bind:value={ttNum} readonly required />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label for="startDate">Start Date</label>
                                    <input type="date" id="startDate" name="startDate" class="form-control form-control-lg" bind:value={startDate}>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label for="endDate">End Date</label>
                                    <input type="date" id="endDate" name="endDate" class="form-control form-control-lg" bind:value={endDate}>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label" for="typeHoliday">Type of Holiday</label>
                                    <select class="form-select" id="typeHoliday" bind:value={typeHoliday} required>
                                        <option value="" selected>choose type</option>
                                        <option value="beach">Beach</option>
                                        <option value="bush">Bush</option>
                                        <option value="ski">Ski</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label" for="reason">Reason for Travel</label>
                                    <select class="form-select" id="reason" bind:value={reason} required>
                                        <option value="" selected>choose reason</option>
                                        <option value="leisure">Leisure</option>
                                        <option value="business">Business</option>
                                        <option value="sport">Sport</option>
                                    </select>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label" for="destination">Destination</label>
                                    <select class="form-select" id="destination" bind:value={where} required>
                                        <option value="" selected>choose destination</option>
                                        <option value="domestic">Domestic</option>
                                        <option value="international">International</option>
                                        <option value="africa">Africa</option>
                                    </select>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label form-check-label" for="nationality">South African</label>
                                    <div class="form-switch mt-1">
                                        <input class="form-check-input form-control" type="checkbox" role="switch" id="nationality" bind:checked={nationality}>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label" for="numChild">Number of Children</label>
                                    <input type="number" name="numChild" id="numChild" class="form-control form-control-lg" placeholder="0" bind:value={numChild} min="0" max="100" />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label" for="numAdult">Number of Adults</label>
                                    <input type="number" name="numAdult" id="numAdult" class="form-control form-control-lg" placeholder="0" bind:value={numAdult} min="0" max="100" />
                                </div>
                                <div class="col-12 mt-2">
                                    <label class="form-label" for="budget">Budget</label>
                                    <select class="form-select" id="budget" bind:value={budget} required>
                                        <option value="" selected>choose budget</option>
                                        <option value="budget">Budget</option>
                                        <option value="standard">Standard</option>
                                        <option value="luxury">Luxury</option>
                                    </select>
                                </div>
                            </div>
                            <button class="btn btn-outline-light btn-lg px-4 mt-4" type="submit" on:click|preventDefault={submitForm} disabled={buttonSubmit}>Submit</button>
                        </form>
                    </div>
                    <div>
                        <p class="mb-0">Partner's email <a href="mailto:gdoig@mweb.co.za" class="text-white-50 fw-bold">gdoig@mweb.co.za</a></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
{/if}

<style>
    .form-check-input{
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