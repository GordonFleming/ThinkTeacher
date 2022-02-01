<script context="module">
	export const prerender = true;
</script>

<script>
    import axios from 'axios'
    import { goto } from '$app/navigation'
    import Icon from 'svelte-awesome'
    import { arrowLeft, eye, eyeSlash } from 'svelte-awesome/icons'
	import { sgKey, prod } from '$lib/env.js'
    import z from 'zxcvbn'
    import saIdParser from 'south-african-id-parser'
    import { onMount } from 'svelte'
    import { id } from '$lib/stores';
    import { Jumper } from 'svelte-loading-spinners'

    let API_URL = 'http://localhost:1337'
    let sendgridList = "57df636d-5399-423f-bf72-35424b5644b5"
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.thinkteacher.co.za"
        sendgridList = "75b1cd1c-6bb0-406b-bc94-d7c2f04bc9f8"
    }

    onMount(() =>{
        if(localStorage.getItem("provider") == 'google'){
            registerNext = true
            provider = true
        }
	})

    // Disable button
    let buttonNext = true, buttonSubmit = true, loading = false
    $: (email && username && s) ? buttonNext = false : buttonNext = true
    $: (firstName && lastName && isValidID && cell && eduPhase !== '') ? buttonSubmit = false : buttonSubmit = true

    let username, email, password = ""
    let msg, errorMsg = null
    let registerNext = false, registered = false, provider = false
    let firstName, lastName, idNum, altMail, cell, eduPhase, qualification, sace, workplace, province

    // TT Code Gen
    let ttCode = 'TT'
    var dateObj = new Date()
    var dateNow = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    ttCode += dateNow.replace(new RegExp('/','g'),'')
    ttCode += Math.floor((Math.random() * 899) + 100)

    // Password checks
    let barCol = ""
    $: s = z(password).score > 2
    $: progress = (z(password).score/4)*100
    $: (s) ? barCol = "bg-success" : barCol = "bg-danger"
    $: isValidID = saIdParser.validate(idNum)
    
    async function registerUser(){
        if(provider){
            await axios.put(`${API_URL}/users/${$id}`,{
                firstName: firstName,
                lastName: lastName,
                idNum: idNum,
                altMail: altMail,
                cell: cell,
                eduPhase: eduPhase,
                qualification: qualification,
                sace: sace,
                workplace: workplace,
                province: province,
                ttCode: ttCode, 
            },
            { headers: { Authorization: 'Bearer ' + localStorage.getItem("jwt"),} }
            ).then(response => {
                msg = response.data.firstName + ", you have been successfully registered with ThinkTeacher!"
                email = response.data.email
                registerNext = false
                registered = true
            })
        }
        if(s && !provider){ 
            errorMsg=null
            await axios
            .post(`${API_URL}/auth/local/register`, {
                username: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                idNum: idNum,
                altMail: altMail,
                cell: cell,
                eduPhase: eduPhase,
                qualification: qualification,
                sace: sace,
                workplace: workplace,
                province: province,
                ttCode: ttCode, 
            })
            .then(response => {
                console.log('User profile', response.data.user)
                msg = response.data.user.firstName + ", you have been successfully registered with ThinkTeacher! Please confirm your email to login."
                registerNext = false
                registered = true
            })
            .catch(error => {
                console.log('An error occurred:', error.response)
                errorMsg = error.response.data.message[0].messages[0].message
            })
        }else if(!s && !provider){
            errorMsg = "Password not strong enough"
        }
        // Sendgrid
        if(!errorMsg){
            loading = true
            document.documentElement.scrollTop = 0

            // Account for missing altMail & province
            if(!altMail) altMail = "null@null.com" 
            if(!province) province = "NA" 
                
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
                            "custom_fields": {"e1_T":ttCode},
                            },
                        ]},
                    { headers: { Authorization: `Bearer ${sgKey}`}
            }).then(response => {
                console.log('SG reponse: ', response.statusText, " ", response.data)
                document.getElementById("register").reset()
                password = ""
                loading = false
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }

    let seePlz = true
    function seePassword() {
        var x = document.getElementById("Password")
        if (x.type === "password") {
            x.type = "text"
            seePlz = false
        } else {
            seePlz = true
            x.type = "password"
        }
    }
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

{#if loading}
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
    </div>
{/if}

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                {#if registerNext && !provider}
                    <i style="padding-top: 1.8rem; padding-left: 1.8rem;" on:click={() => registerNext = false}><Icon data={ arrowLeft } scale="1.8"/></i>
                {/if}
                <div class="card-body p-md-3 p-lg-4 text-center">
                <div class="mb-md-3">
                    <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                    {#if errorMsg}
                        <h4 class="error-col">{errorMsg}</h4>
                    {:else if msg}
                        <h4 class="success-col">{msg}</h4>
                    {/if}

                    {#if provider && !registered}
                        <p>Please complete your registration...</p>
                    {/if}
                    {#if registered}
                        <button class="btn btn-secondary mx-auto mt-3 mb-3 fw-bold fs-5" style="width: 300px;" on:click={() => goto("/login")}>I confirmed my email and want to login</button>
                    {/if}
                    
                    <form id="register">
                        {#if !registerNext}

                            <div class="mt-4 google-box">                      
                                <div id="google-sso" class="Sso__button Sso__googleIdButton" on:click={() => goto('https://thinkteacher-strapi.glass.thinkteacher.co.za/connect/google')}>
                                    Continue with Google
                                </div>
                                <div class="Sso__divider ">
                                    <span class="Sso__dividerLine"></span>
                                    <span class="Sso__dividerText">or</span>
                                    <span class="Sso__dividerLine"></span>
                                </div>
                            </div>

                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Username">Username</label>
                                <input type="text" name="username" id="username" class="form-control form-control-lg" placeholder="username" bind:value={username} required />
                            </div>
                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Email">Email</label>
                                <input type="email" id="Email" class="form-control form-control-lg" placeholder="email" bind:value={email} required />
                            </div>
                            <div class="form-outline form-white mb-4">
                                <label class="form-label" for="Password">Password</label><br>
                                <input type="password" id="Password" class="form-control form-control-lg" placeholder="password" style="margin-right: -2.2rem; display:inline-block;" bind:value={password} required/>
                                <i on:click={seePassword}><Icon data={ (seePlz) ? eye : eyeSlash } scale="1.5" style="cursor: pointer; display:inline-block; z-index: 99;"/></i>
                                {#if password.length > 0}
                                    <div class="progress mt-2">
                                        <div class="progress-bar {barCol}" role="progressbar" style="width: {progress}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <p style={s||'color:red'}>
                                        {s ? 'Strong password' : 'Password not strong enough. Try using a mix of capital letters, numbers and special characters with a length > 8.'}
                                    </p>
                                {/if}
                            </div>

                            <button class="btn btn-outline-light btn-lg px-4" on:click|preventDefault={() => registerNext = true} disabled={buttonNext}>Next</button>

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
                                        <option value="" selected>choose phase</option>
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
                            <button class="btn btn-outline-light btn-lg px-4 mt-4" type="submit" on:click|preventDefault={registerUser} disabled={buttonSubmit}>Register</button>
                        {/if}
                    </form>

                </div>
    
                <div>
                    <p class="mb-0 mt-3">Already have an account? <a href="/login" class="text-white-50 fw-bold">Login</a></p>
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