<script>
    import axios from 'axios'
    import { goto } from '$app/navigation'
    import Icon from 'svelte-awesome'
    import { arrowLeft } from 'svelte-awesome/icons'
	import { sgKey } from '$lib/env.js'
    import z from 'zxcvbn'
    import { prod } from '$lib/env.js'
    import saIdParser from 'south-african-id-parser';

    let API_URL = 'http://localhost:1337'
    let sendgridList = "57df636d-5399-423f-bf72-35424b5644b5"
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
        sendgridList = "75b1cd1c-6bb0-406b-bc94-d7c2f04bc9f8"
    }

    let username, email, password = ""
    let msg, errorMsg, errorDetails
    let registerNext = false, registered = false
    let firstName, lastName, idNum, altMail, cell, eduPhase, qualification, sace, workplace, province
    let userObj

    let barCol = ""
    $: s = z(password).score > 2
    $: progress = (z(password).score/4)*100
    $: if(s){
        barCol = "bg-success"
    }else{
        barCol = "bg-danger"
    }

    $: isValidID = saIdParser.validate(idNum)
    
    async function registerUser(){
        if(s){
            if(isValidID){
                errorMsg = null
                if(!errorDetails){
                    await axios
                    .post(`${API_URL}/auth/local/register`, {
                        username: username,
                        email: email,
                        password: password,
                    })
                    .then(response => {
                        console.log('User profile', response.data.user)
                        msg = response.data.user.username + ", you have been successfully registered with ThinkTeacher! Please confirm your email to login."
                        userObj = response.data.user
                    })
                    .catch(error => {
                        console.log('An error occurred:', error.response)
                        errorMsg = error.response.data.message[0].messages[0].message
                    })

                    // Account for missing altMail and province
                    if(altMail && province){
                        await axios
                        .put('https://sendgrid.com/v3/marketing/contacts', {
                                    "list_ids": [sendgridList],
                                    "contacts": [{
                                        "email":email,
                                        "alternate_emails":[altMail],
                                        "first_name":firstName,
                                        "last_name":lastName,
                                        "state_province_region":province,
                                        "phone_number":cell,
                                        },
                                    ]},
                                { headers: { Authorization: `Bearer ${sgKey}`}
                        }).then(response => {
                            console.log('SG reponse: ', response.statusText, " ", response.data)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    }else{
                        await axios
                        .put('https://sendgrid.com/v3/marketing/contacts', {
                                    "list_ids": [sendgridList],
                                    "contacts": [{
                                        "email":email,
                                        "first_name":firstName,
                                        "last_name":lastName,
                                        "phone_number":cell,
                                        },
                                    ]},
                                { headers: { Authorization: `Bearer ${sgKey}`}
                        }).then(response => {
                            console.log('SG reponse: ', response.statusText, " ", response.data)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                    }
                } else{
                    errorMsg = "Validation Error"
                }

                if(!errorMsg){
                    await axios
                    .post(`${API_URL}/user-infos`, {
                        firstName: firstName,
                        lastName: lastName,
                        idNum: idNum,
                        altMail: altMail,
                        cell: cell,
                        eduPhase: eduPhase,
                        qualification: qualification,
                        sace: sace,
                        workplace: workplace,
                        user: userObj,
                        province: province,
                    }).then( response => {
                        console.log('UserDetails', response.data)
                        registerNext = false
                        registered = true
                    })
                    .catch(error => {
                        errorDetails = error.response
                        console.log('An error occurred:', error.response)
                    })
                    document.getElementById("register").reset()
                }
            }else{
                errorMsg = "Invalid ID"
            }
        }else{
            errorMsg = "Password not strong enough"
        }
    }
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                {#if registerNext}
                    <i style="padding-top: 1.8rem; padding-left: 1.8rem;" on:click={() => registerNext = false}><Icon data={ arrowLeft } scale="1.8"/></i>
                {/if}
                <div class="card-body p-md-3 p-lg-4 text-center">
                <div class="mb-md-3 mt-md-2">
                    <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                    {#if errorMsg}
                        <h4 class="error-col">{errorMsg}</h4>
                    {:else if msg}
                        <h4 class="success-col">{msg}</h4>
                    {/if}

                    {#if registered}
                        <button class="btn btn-secondary mx-auto mt-3 mb-3 fw-bold fs-3" style="width: 300px;" on:click={() => goto("/login")}>Login</button>
                    {/if}
                    
                    <form id="register">
                        {#if !registerNext}
                            <p class="text-white-50 mb-3">Please enter your email and password</p>
                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Username">Username</label>
                                <input type="text" name="username" id="username" class="form-control form-control-lg" placeholder="username" bind:value={username} required />
                            </div>
                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Email">Email</label>
                                <input type="email" id="Email" class="form-control form-control-lg" placeholder="email" bind:value={email} required />
                            </div>
                            <div class="form-outline form-white mb-4 text-left">
                                <label class="form-label" for="Password">Password</label>
                                <input type="password" id="Password" class="form-control form-control-lg" placeholder="password" bind:value={password} required />
                                {#if password.length > 0}
                                    <div class="progress mt-2">
                                        <div class="progress-bar {barCol}" role="progressbar" style="width: {progress}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p style={s||'color:red'}>
                                        {s ? 'Strong' : 'Weak'} password
                                    </p>
                                {/if}
                            </div>

                            <button class="btn btn-outline-light btn-lg px-4" on:click|preventDefault={() => registerNext = true}>Next</button>

                        {:else}
                            
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <label class="form-label" for="name">First Name</label>
                                    <input type="text" name="username" id="name" class="form-control form-control-lg" placeholder="First Name" bind:value={firstName} required />
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <label class="form-label" for="surname">Surname</label>
                                    <input type="text" name="surname" id="surname" class="form-control form-control-lg" placeholder="Surname" bind:value={lastName} required />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="idNum">ID Number</label>
                                    <input type="text" name="idNumber" id="idNum" class="form-control form-control-lg" placeholder="ID number" bind:value={idNum} required />
                                    {#if idNum}
                                        <small style={isValidID||'color:red'}>
                                            {isValidID ? 'Valid' : 'Not a valid'} ID
                                        </small>
                                    {/if}

                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="cell">Cell Number</label>
                                    <input type="tel" name="cell" id="cell" class="form-control form-control-lg" placeholder="Cell number" bind:value={cell} min="0" max="9999999999999" required />
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="form-label" for="eduPhase">Education Phase</label>
                                    <select class="form-select" id="eduPhase" aria-label="Education Phase" bind:value={eduPhase} required>
                                        <option selected>choose phase</option>
                                        <option value="early_childhood_development">Early Childhood Development</option>
                                        <option value="foundation_phase">Foundation Phase</option>
                                        <option value="intermediate_phase">Intermediate Phase</option>
                                        <option value="senior_phase">Senior Phase</option>
                                        <option value="further_education">Further Education</option>
                                        <option value="training_phase">Training Phase</option>
                                    </select>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="sace">SACE Number</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <input type="number" name="sace" id="sace" class="form-control form-control-lg" placeholder="SACE number" bind:value={sace} min="0" max="999999999" />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="qual">Qualification</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <input type="text" name="qual" id="qual" class="form-control form-control-lg" placeholder="Qualification" bind:value={qualification} />
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="form-label" for="altEmail">Alternative Email</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <input type="email" id="altEmail" class="form-control form-control-lg" placeholder="alternative email" bind:value={altMail} />
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="form-label" for="school">School / Institution</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <input type="text" name="school" id="school" class="form-control form-control-lg" placeholder="school or institution" bind:value={workplace} />
                                </div>
                                <div class="col-12 mt-2">
                                    <label class="form-label" for="province">Province</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <select class="form-select" id="province" aria-label="Province" bind:value={province}>
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
                            </div>
                            <button class="btn btn-outline-light btn-lg px-4 mt-4" type="submit" on:click|preventDefault={registerUser}>Register</button>
                        {/if}
                    </form>

                </div>
    
                <div>
                    <p class="mb-0">Already have an account? <a href="/login" class="text-white-50 fw-bold">Login</a></p>
                </div>
    
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<style>
    i{
        cursor: pointer;
    }
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
    }
</style>