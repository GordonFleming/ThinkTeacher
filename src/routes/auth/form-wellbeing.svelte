<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let loading = true, buttonSubmit = false
    //$: if(typeHoliday !== ''){ buttonSubmit = false }

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

    let lifeCoaching, bereavement, nutrition, wellbeing, other, partnerEmail="u20447613@tuks.co.za" //kim@kimforbes.co.za

    async function submitForm(){
        await axios
            .post(`${API_URL}/partner-forms/custom`, {
                fullName: fullname,
                ttNumber: ttNum,
                email: email,
                custom: [{
                    __component: "custom-form.wellbeing",
                    lifeCoaching: lifeCoaching,
                    bereavement: bereavement,
                    nutrition: nutrition,
                    wellbeing: wellbeing,
                    other: other,
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
                                    <label class="form-label form-check-label" for="lifeCoaching">Life Coaching</label>
                                    <div class="form-switch mt-1">
                                        <input class="form-check-input form-control" type="checkbox" role="switch" id="lifeCoaching" bind:checked={lifeCoaching}>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label form-check-label" for="bereavement">Bereavement</label>
                                    <div class="form-switch mt-1">
                                        <input class="form-check-input form-control" type="checkbox" role="switch" id="bereavement" bind:checked={bereavement}>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label form-check-label" for="nutrition">Nutrition</label>
                                    <div class="form-switch mt-1">
                                        <input class="form-check-input form-control" type="checkbox" role="switch" id="nutrition" bind:checked={nutrition}>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-2">
                                    <label class="form-label form-check-label" for="wellbeing">Well-being</label>
                                    <div class="form-switch mt-1">
                                        <input class="form-check-input form-control" type="checkbox" role="switch" id="wellbeing" bind:checked={wellbeing}>
                                    </div>
                                </div>
                                <div class="col-12 mt-2">
                                    <label class="form-label" for="other">Other</label>
                                    <input type="text" name="other" id="other" class="form-control form-control-lg" bind:value={other} />
                                </div>
                            </div>
                            <button class="btn btn-outline-light btn-lg px-4 mt-4" type="submit" on:click|preventDefault={submitForm} disabled={buttonSubmit}>Submit</button>
                        </form>
                    </div>
                    <div>
                        <p class="mb-0">Partner's email <a href="mailto:kim@kimforbes.co.za" class="text-white-50 fw-bold">kim@kimforbes.co.za</a></p>
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